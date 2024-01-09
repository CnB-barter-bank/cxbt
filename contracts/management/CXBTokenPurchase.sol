//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import '@bgrusnak/solidity-icoset/contracts/management/Purchase.sol';
import '@openzeppelin/contracts/access/manager/AccessManaged.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Pausable.sol';

contract CXBTokenPurchase is Purchase, AccessManaged, Pausable {
  constructor(
    address _token,
    address _chainlink,
    uint256 _native,
    uint256 _bonus,
    address initialAuthority
  )
    payable
    Purchase(_token, _chainlink, _native, _bonus)
    AccessManaged(initialAuthority)
  {}

  function setToken(address _token) external override restricted {
    _setToken(_token);
  }

  function setChainLinkInterface(
    address _chainlink
  ) external override restricted {
    _setChainLinkInterface(_chainlink);
  }

  function setNativeRate(uint256 _native) external override restricted {
    _setNativeRate(_native);
  }

  function setVesting(address _vesting) external override restricted {
    _setVesting(_vesting);
  }

  function setRate(
    address currency,
    uint256 _rate
  ) external override restricted returns (bool) {
    return _setRate(currency, _rate);
  }

  function setBonus(uint8 _bonus) external override restricted {
    _setBonus(_bonus);
  }

  function setCashPercent(uint8 percent) external override restricted {
    _setCashPercent(percent);
  }

  function setTokenPercent(uint8 percent) external override restricted {
    _setTokenPercent(percent);
  }

  function calculateAmount(
    address currency,
    uint256 value
  ) external view override returns (uint256) {
    return _calculateAmount(currency, value);
  }

  function deposit() external payable override {
    uint256 amount = _calculateAmount(address(0), msg.value);
   _buy(msg.sender, address(0), msg.value, amount, address(0));
  }

  function deposit(address referral) external payable override {
    uint256 amount = _calculateAmount(address(0), msg.value);
    _buy(msg.sender, address(0), msg.value, amount, referral);
  }

  function buy(
    address currency,
    uint256 value,
    address referral
  ) external override returns (bool) {
    uint256 amount = _calculateAmount(currency, value);
    return _buy(msg.sender, currency, value, amount, referral);
  }

  function buy(
    address buyer,
    address currency,
    uint256 value,
    address referral
  ) external override returns (bool) {
    uint256 amount = _calculateAmount(currency, value);
    return _buy(buyer, currency, value, amount, referral);
  }

  function withdraw(address payable _to) external virtual override restricted {
    if (address(this).balance > 0) _withdraw(_to);
  }

  function withdraw(
    address currency,
    address _to
  ) external override restricted {
    _withdraw(currency, _to);
  }

  function clean(
    address payable _to,
    address newOwner
  ) external override restricted {
    _clean(_to, newOwner);
  }

  function pause() external restricted {
    _pause();
  }

  function unpause() external restricted {
    _unpause();
  }
}
