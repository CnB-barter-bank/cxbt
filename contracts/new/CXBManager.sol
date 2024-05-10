//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {AccessManagerUpgradeable} from "@openzeppelin/contracts-upgradeable/access/manager/AccessManagerUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./ICXBManager.sol";
import "@openzeppelin/contracts/utils/structs/BitMaps.sol";

contract CXBManager is
    ICXBManager,
    Initializable,
    UUPSUpgradeable,
    AccessManagerUpgradeable,
    AccessControlUpgradeable,
    OwnableUpgradeable
{
    using BitMaps for BitMaps.BitMap;
    BitMaps.BitMap private _whitelisted;
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bool private _isInitialized;
    uint256 public taxPromille;
    mapping(address => uint256) private _freezedAmounts;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function initialize() public initializer {
        if (_isInitialized) return;
        __UUPSUpgradeable_init();
        __Ownable_init(msg.sender);
        __AccessControl_init();
        __AccessManager_init(msg.sender);
        _isInitialized = true;
        taxPromille = 1000;
    }

    function getFrozenAmount(address target) external view virtual override {
        uint256 freezed = _freezedAmounts[target];
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, freezed)
            revert(ptr, 32)
        }
    }

    function whitelisted(address target) external view virtual override returns (bool) {
        return _whitelisted.get(uint256(uint160(target)));
    }

  
    function permitted(
        address target,
        uint256 amount,
        uint256 total
    ) external view virtual override {
        bool res = _whitelisted.get(uint256(uint160(target)));
        if (!res) {
            res = (_freezedAmounts[target]+amount <= total);
        }
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, res)
            revert(ptr, 1)
        }
    }

    function tax(
        address target,
        uint256 amount
    ) external view virtual override {
        bool res = _whitelisted.get(uint256(uint160(target)));
        uint256 taxAmount;
        if (!res) {
            if (taxPromille == 1000) {
                taxAmount = amount;
            } else {
                taxAmount = (amount * taxPromille) / 1000;
            }
        }
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, taxAmount)
            revert(ptr, 32)
        }
    }

    function whitelist(address target) external virtual override onlyOwner {
        _whitelisted.set(uint256(uint160(target)));
        emit Whitelisted(target);
    }

    function unWhitelist(address target) external virtual override onlyOwner {
        _whitelisted.unset(uint256(uint160(target)));
        emit UnWhitelisted(target);
    }

    function freeze(
        address target,
        uint256 amount
    ) external virtual override onlyOwner {
        _freezedAmounts[target] = _freezedAmounts[target] + amount;
        emit Freezed(target, _freezedAmounts[target], amount);
    }

    function unFreeze(
        address target,
        uint256 amount
    ) external virtual override onlyOwner {
        if (_freezedAmounts[target] <= amount) {
            emit UnFreezed(target, 0, _freezedAmounts[target]);
            _freezedAmounts[target] = 0;
        } else {
            _freezedAmounts[target] = _freezedAmounts[target] - amount;
            emit UnFreezed(target, _freezedAmounts[target], amount);
        }
    }

    function defineTax(uint256 amount) external virtual override onlyOwner {
        if (amount > 1000) revert IncorrectTaxValue(amount);
        taxPromille = amount;
        emit TaxDefined(amount);
    }
}
