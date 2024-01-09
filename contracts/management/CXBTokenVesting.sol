//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/manager/AccessManaged.sol';
import '@openzeppelin/contracts/utils/structs/EnumerableMap.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Pausable.sol';
import '../tokens/CXBToken.sol';
import '@bgrusnak/solidity-icoset/contracts/management/Vesting.sol';
import '@bgrusnak/solidity-icoset/contracts/management/IAirdrop.sol';

contract CXBTokenVesting is Vesting, AccessManaged, ReentrancyGuard, Pausable {
  constructor(
    CXBToken _token,
    address initialAuthority,
    IAirdrop _airdrop
  ) AccessManaged(initialAuthority) Vesting(_token, _airdrop) {
    totalDistributed = 0;
    totalRedeemed = 0;
    totalKPI = 0;
  }

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

  /// @notice Distribute the new vesting amount
  /// @param _to Receiver address.
  /// @param _amount Distributed amount.
  function distribute(
    address _to,
    uint256 _amount
  ) public whenNotPaused restricted {
    _distribute(_to, _amount);
  }

  /// @notice Take the current unlocked amount
  function redeem(
    address _to
  ) public nonReentrant whenNotPaused returns (uint256) {
    return _redeem(_to);
  }

  /// @notice Set the new KPI
  /// @param _code The KPI id code
  /// @param _time timestamp
  /// @param _timeStatus status of the time
  /// @param _weight weight of the KPI parameter in the total KPI
  function addKPI(
    bytes32 _code,
    uint256 _time,
    KPITimeStatus _timeStatus,
    uint16 _weight
  ) public restricted {
    _addKPI(_code, _time, _timeStatus, _weight);
  }

  /// @notice Modify the KPI properties
  /// @param _code The KPI id code
  /// @param _time timestamp
  /// @param _timeStatus status of the time
  /// @param _weight weight of the KPI parameter in the total KPI
  function modifyKPI(
    bytes32 _code,
    uint256 _time,
    KPITimeStatus _timeStatus,
    uint16 _weight
  ) public restricted {
    _modifyKPI(_code, _time, _timeStatus, _weight);
  }

  /// @notice Update the  KPI value
  /// @param _code The KPI id code
  /// @param _amount the current value of KPI
  function updateKPI(bytes32 _code, uint16 _amount) public restricted {
    _updateKPI(_code, _amount);
  }

  /// @notice Increase the  KPI value
  /// @param _code The KPI id code
  /// @param _amount the added value of KPI
  function increaseKPI(bytes32 _code, uint16 _amount) public restricted {
    _increaseKPI(_code, _amount);
  }

  /// @notice Remove the KPI from the list
  /// @param _code The KPI id code
  function removeKPI(bytes32 _code) public restricted {
    _removeKPI(_code);
  }
}
