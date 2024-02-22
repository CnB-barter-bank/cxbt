//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/manager/AccessManaged.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableMap.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Pausable.sol';
import '../tokens/CXBToken.sol';
import '@bgrusnak/solidity-icoset/contracts/management/ColdStorage.sol';
import '@bgrusnak/solidity-icoset/contracts/management/IAirdrop.sol';

contract CXBTColdStorage is
  ColdStorage,
  AccessManaged,
  ReentrancyGuard,
  Pausable
{
  constructor(
    CXBToken _token,
    address initialAuthority,
    IAirdrop _airdrop
  )
    AccessManaged(initialAuthority)
    ColdStorage(_token, _airdrop) 
  {}

  /// @notice Update token address
  /// @param _token New token address.
  function updateToken(address _token) public restricted {
    _updateToken(_token);
  }

  /// @notice Update token address
  /// @param _airdrop New token address.
  function updateAirdrop(address _airdrop) public restricted {
    _updateAirdrop(_airdrop);
  }

  /// @notice Distribute the new amount
  /// @param _to Receiver address.
  /// @param _amount Distributed amount.
  function distribute(
    address _to,
    uint256 _amount
  ) public whenNotPaused restricted {
    _distribute(_to, _amount);
  }

  /// @notice Enable the amount
  /// @param _to Receiver address.
  /// @param _amount Distributed amount.
  function enable(
    address _to,
    uint256 _amount
  ) public whenNotPaused restricted {
    _enable(_to, _amount);
  }

  /// @notice Take the current unlocked amount
  function redeem(
    address _to
  ) public nonReentrant whenNotPaused returns (uint256) {
    return _redeem(_to);
  }
 
}
