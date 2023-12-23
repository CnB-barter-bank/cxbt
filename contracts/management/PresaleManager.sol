// SPDX-License-Identifier: Private
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/manager/AccessManager.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/access/manager/IAccessManaged.sol";
import "contracts/tokens/IFreezable.sol"; 

/**
 * @title PresaleManager
 * @author Ilya A. Shlyakhovoy
 * @notice The simple Manager contract for presale phase during the
 * mature Manager contract in development
 * Only confirms execution of token functions if owner called it and
 * receives the funds in the stablecoins
 */

contract PresaleManager is Ownable, AccessManager, Pausable {
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    error EmptyToken();
    error EmptyCurrency();
    error EmptyRate();
    error TooBigRate(uint256 rate);
    error EmptyValue();
    error CannotRedeem(address currency);
    error CannotTransfer(address currency);
    error NotOwned(address target);
    error EmptyNewToken();

    event BoughtTokens(
        address indexed sender,
        address indexed currency,
        uint256 indexed value,
        uint256 amount
    );
    // address owner;
    address tokenContract;
    uint256 bonusPercent;
    EnumerableMap.AddressToUintMap private currencies;

    constructor(
        address initialOwner,
        address token,
        uint256 bonus
    ) Ownable(initialOwner) AccessManager(initialOwner) {
        bonusPercent = 100 + bonus;
        tokenContract = token;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function freeze(address target) public onlyOwner {
        if (tokenContract == address(0)) revert EmptyToken();
        IFreezable(tokenContract).freeze(target);
    }

    function unfreeze(address target) public onlyOwner {
        if (tokenContract == address(0)) revert EmptyToken();
        IFreezable(tokenContract).unfreeze(target);
    }

    function defineToken(address _token) public onlyOwner whenPaused {
        if (_token == address(0)) revert EmptyToken();
        tokenContract = _token;
    }

    function getToken() public view returns (address) {
        return tokenContract;
    }

    /**
     * Define or change new allowed currency with rate. Rate cannot be more than 100
     *  tokens for the 1 currency unit. Rate is nominated in token decimals
     *
     * @param currency  the address of the currency token
     * @param rate the exchange rate to token
     */

    function setRate(
        address currency,
        uint256 rate
    ) public onlyOwner whenPaused returns (bool) {
        if (currency == address(0)) revert EmptyCurrency();
        if (rate == 0) revert EmptyRate();
        if (tokenContract == address(0)) revert EmptyToken();
        if (
            rate > uint256(10 ** (IERC20Metadata(tokenContract).decimals() + 2))
        ) revert TooBigRate(rate);
        return currencies.set(currency, rate);
    }

    function getRate(address currency) public view returns (uint256) {
        if (currency == address(0)) revert EmptyCurrency();
        if (!currencies.contains(currency)) return 0;
        return currencies.get(currency);
    }

    function hasRate(
        address currency
    ) public view whenNotPaused returns (bool) {
        if (currency == address(0)) revert EmptyCurrency();
        return currencies.contains(currency);
    }

    function setBonus(uint256 bonus) public onlyOwner whenPaused {
        bonusPercent = 100 + bonus;
    }

    function getBonus() public view returns (uint256) {
        return bonusPercent - 100;
    }

    function canCall(
        address caller,
        address target,
        bytes4 selector
    ) public view virtual override returns (bool immediate, uint32 delay) {
        if (caller == owner()) return (true, 0);
        (bool found,  ) = hasRole(ADMIN_ROLE, caller);
        return (found, 0);
    }

    function getResultAmount(
        address currency,
        uint256 value
    ) public view returns (uint256) {
        if (currency == address(0)) revert EmptyCurrency();
        if (value == 0) revert EmptyValue();
        if (tokenContract == address(0)) revert EmptyToken();
        // get the source decimals and add 2 because it will be multiplied by bonus percentage
        uint256 decimals = IERC20Metadata(currency).decimals() + 2;
        uint256 rate = getRate(currency);
        return (rate * value * bonusPercent) / (10 ** decimals);
    }

    function buy(address currency, uint256 value) public returns (bool) {
        uint256 amount = getResultAmount(currency, value);
        if (!IERC20(currency).transferFrom(msg.sender, address(this), value))
            return false;
        bool transferred = IERC20(tokenContract).transfer(msg.sender, amount);
        if (transferred) emit BoughtTokens(msg.sender, currency, value, amount);
        return transferred;
    }

    function balanceOf(address currency) public view returns (uint256) {
        if (!hasRate(currency)) return 0;
        return IERC20(currency).balanceOf(address(this));
    }

    function redeem(address currency, address _to) public onlyOwner whenPaused {
        if (
            !IERC20(currency).transfer(
                _to,
                IERC20(currency).balanceOf(address(this))
            )
        ) revert CannotRedeem(currency);
    }

    function destroy(
        address payable _to,
        address newAuthority
    ) public onlyOwner whenPaused {
        if (tokenContract == address(0)) revert EmptyToken();
        IAccessManaged(tokenContract).setAuthority(newAuthority);
        if (
            !IERC20(tokenContract).transfer(
                newAuthority,
                IERC20(tokenContract).balanceOf(address(this))
            )
        ) revert CannotTransfer(tokenContract);

        uint256 i;
        uint256 balance;
        for (i = 0; i < currencies.length(); i++) {
            (address currency, ) = currencies.at(i);
            balance = IERC20(currency).balanceOf(address(this));
            if (balance > 0 && !IERC20(currency).transfer(_to, balance))
                revert CannotTransfer(currency);
        }
        selfdestruct(_to);
    }
}
