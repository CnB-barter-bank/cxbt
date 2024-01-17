//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import '@bgrusnak/solidity-icoset/contracts/management/Bounty.sol';
import '@bgrusnak/solidity-icoset/contracts/management/IVesting.sol';
import '@openzeppelin/contracts/access/manager/AccessManaged.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Pausable.sol';

contract CXBTokenBounty is Bounty, AccessManaged, Pausable {
  constructor(
    address _token,
    address _vesting,
    address initialAuthority
  ) Bounty(_token, _vesting) AccessManaged(initialAuthority) {}

  function refuel(
    address agent,
    uint256 addAmount
  ) external override restricted {
    _refuel(agent, addAmount);
  }

  function give(
    address target,
    uint256 amount
  ) external override whenNotPaused {
    _give(target, amount);
  }

  function empty(address target) external override restricted {
    _empty(target);
  }

  function clean(address _to) external override restricted {
    _clean(_to);
  }

  function setVesting(address _vesting) external override restricted {
    _setVesting(_vesting);
  }

  function pause() external restricted {
    _pause();
  }

  function unpause() external restricted {
    _unpause();
  }
}
