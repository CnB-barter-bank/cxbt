//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ERC20BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {ERC20PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import {AccessManagedUpgradeable} from "@openzeppelin/contracts-upgradeable/access/manager/AccessManagedUpgradeable.sol";
import {ERC20PermitUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./ICXBManager.sol";

// import "@bgrusnak/solidity-icoset/contracts/utils/PartialFreezable.sol";

contract CXBToken is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    AccessManagedUpgradeable,
    ERC20BurnableUpgradeable,
    ERC20PausableUpgradeable,
    ERC20PermitUpgradeable
{
    error ExcessFrozen(
        address account,
        uint256 amountNeeded,
        uint256 amountFrozen,
        uint256 totalAmount
    );
    error NotPermitted(address account, uint256 amount);
    error ExcessTax(address account, uint256 amount, uint256 tax);

    bool private _isInitialized;

    modifier whenNotFreezed(address target, uint256 amount) {
        (, bytes memory reason) = authority().staticcall(
            abi.encodeWithSignature("getFrozenAmount(address)", target)
        );
        uint frozen;
        assembly {
            frozen := mload(add(reason, 32))
        }
        if (frozen + amount > balanceOf(target))
            revert ExcessFrozen(target, amount, frozen, balanceOf(target));
        _;
    }

    modifier whenPermitted(address target, uint256 amount) {
        (, bytes memory reason) = authority().staticcall(
            abi.encodeWithSignature(
                "permitted(address,uint256,uint256)",
                target,
                amount,
                balanceOf(target)
            )
        );
        bool permitted;
        assembly {
            permitted := mload(add(reason, 32))
        }
        if (!permitted) revert NotPermitted(target, amount);
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(/* 
        string memory name_,
        string memory symbol_,
        address initialAuthority,
        uint256 premintAmount */
    ) public initializer {
        if (_isInitialized) return;
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __ERC20_init( "CX Cash Token",
            "CXCT");
        __ERC20Pausable_init();
        __ERC20Burnable_init();
        __ERC20Permit_init("CX Cash Token");
        __AccessManaged_init(0x0456075ABF61240F3a9775aB2a4690310cf67802);
        _mint(0x0456075ABF61240F3a9775aB2a4690310cf67802, 25000000000 * 10 ** decimals());
        _isInitialized = true;
    }

    function pause() public restricted {
        _pause();
    }

    function unpause() public restricted {
        _unpause();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function mint(address to, uint256 amount) public restricted {
        _mint(to, amount);
    }

    function _tax(address target, uint256 amount) internal view {
        (, bytes memory reason) = authority().staticcall(
            abi.encodeWithSignature("tax(address,uint256)", target, amount)
        );
        uint tax;
        assembly {
            tax := mload(add(reason, 32))
            let ptr := mload(0x40)
            mstore(ptr, tax)
        }
    }
 
    function transfer(
        address to,
        uint256 value
    )
        public
        virtual
        override 
        whenNotPaused
        whenPermitted(msg.sender, value)
        returns (bool)
    { 
       return _transferTaxed(msg.sender, to, value);
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    )
        public
        virtual
        override
        whenNotPaused
        whenPermitted(from, value)
        returns (bool)
    {
        if (!ICXBManager(authority()).whitelisted(msg.sender)) _spendAllowance(from, to, value);
        return _transferTaxed(from, to, value);
    }

    function burn(
        address to,
        uint256 value
    )
        public
        virtual
        restricted
    {
        _burn(to, value);
    }

  
    function _transferTaxed(
        address from,
        address to,
        uint256 value
    )
        internal
        returns (bool)
    {
        _tax(from, value);
        uint256 tax;
        assembly {
            tax := mload(mload(0x40))
        }
        if (tax >= value) revert ExcessTax(from, value, tax);
        _transfer(from, authority(), tax);
        _transfer(from, to, value - tax);
        return true;
    }

    function _update(
        address from,
        address to,
        uint256 value
    )
        internal
        virtual
        override(ERC20PausableUpgradeable, ERC20Upgradeable)
        whenNotPaused
    {
        super._update(from, to, value);
    }
}
