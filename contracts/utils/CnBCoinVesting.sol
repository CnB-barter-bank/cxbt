// SPDX-License-Identifier: Private
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/manager/AccessManaged.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "../tokens/CnBCoinToken.sol";
import "./CnBCoinAirdrop.sol";

contract CnBCoinVesting is AccessManaged, ReentrancyGuard, Pausable {
    using EnumerableMap for EnumerableMap.Bytes32ToUintMap;
    /**
     * @dev Indicates an error when empty token is provided.
     */
    error CnBCoinVestingEmptyToken();

    /**
     * @dev Indicates an error when empty airdrop is provided.
     */
    error CnBCoinVestingEmptyAirdrop();
    /**
     * @dev Indicates an error when uathorized person calls airdrop only function
     * @param account Address who calls
     */
    error CnBCoinVestingUnauthorizedAccount(address account);
    /**
     * @dev Indicates an error when no tokens can be redeemed.
     */
    error CnBCoinVestingEmptyRedeem();
    /**
     * @dev Indicates an error when kpi redefines.
     * @param code KPI code
     */
    error CnBCoinVestingKPIAlreadyDefined(bytes32 code);

    /**
     * @dev Indicates an error when kpi is not defined.
     * @param code KPI code
     */
    error CnBCoinVestingKPINotDefined(bytes32 code);
    /**
     * @dev Indicates an error when kpi amount value is incorrect.
     * @param code KPI code
     * @param amount amount provided
     */
    error CnBCoinVestingIncorrectAmount(bytes32 code, uint16 amount);
    /**
     * @dev Indicates an error when kpi weight value is incorrect.
     * @param code KPI code
     * @param amount weight provided
     */
    error CnBCoinVestingIncorrectWeight(bytes32 code, uint16 amount);
    event Redeem(address indexed account, uint256 amount);
    event Distribute(address indexed account, uint256 amount);
    event KPIAdded(
        bytes32 indexed code,
        uint256 indexed time,
        KPITimeStatus indexed timeStatus,
        uint16 weight
    );
    event KPIModified(
        bytes32 indexed code,
        uint256 indexed time,
        KPITimeStatus indexed timeStatus,
        uint16 weight
    );
    event KPIUpdated(bytes32 indexed code, uint16 amount);

    event KPIRemoved(bytes32 indexed code);
    enum KPITimeStatus {
        // do not use timestamp
        Ignore,
        // kpi is always zero until the timestamp
        NotBefore,
        // kpi is always 1000 (1) after the timestamp
        AlwaysAfter
    }
    /*
     * KPI allows calculation of vesting value according the different options and time.
     * All KPI values are calculated in promille (1/1000) and are between 0 & 1000 (1)
     */
    struct KPI {
        // the service timestamp for the KPI
        uint256 time;
        // how the timestamp should to be processed
        KPITimeStatus timeStatus;
        // current KPI value
        uint16 current;
        // KPI weight in total KPI
        uint16 weight;
    }

    CnBCoinToken private token;
    CnBCoinAirdrop private airdrop;
    uint256 totalDistributed;
    uint256 totalRedeemed;
    uint256 totalKPI;
    KPI[] kpi;
    EnumerableMap.Bytes32ToUintMap private kpiMap;
    mapping(bytes32 => uint256) public kpiCodes;
    mapping(address => uint256) public amountsDistributed;
    mapping(address => uint256) public amountsRedeemed;

    /**
     * @dev Throws if called by any account other than the airdrop.
     */
    modifier onlyAirdrop() {
        if (address(airdrop) != msg.sender) {
            revert CnBCoinVestingUnauthorizedAccount(msg.sender);
        }
        _;
    }

    constructor(
        CnBCoinToken _token,
        address initialAuthority,
        CnBCoinAirdrop _airdrop
    ) AccessManaged(initialAuthority) {
        if (address(_token) == address(0)) {
            revert CnBCoinVestingEmptyToken();
        }
        if (address(_airdrop) == address(0)) {
            revert CnBCoinVestingEmptyAirdrop();
        }
        token = _token;
        airdrop = _airdrop;
        totalDistributed = 0;
        totalRedeemed = 0;
        totalKPI = 0;
    }

    /// @notice Update token address
    /// @param _token New token address.
    function updateToken(CnBCoinToken _token) public restricted whenPaused {
        if (address(_token) == address(0)) {
            revert CnBCoinVestingEmptyToken();
        }
        token = _token;
    }

    /// @notice Update token address
    /// @param _airdrop New token address.
    function updateAirdrop(
        CnBCoinAirdrop _airdrop
    ) public restricted whenPaused {
        if (address(_airdrop) == address(0)) {
            revert CnBCoinVestingEmptyAirdrop();
        }
        airdrop = _airdrop;
    }

    /// @notice Distribute the new vesting amount
    /// @param _to Receiver address.
    /// @param _amount Distributed amount.
    function distribute(
        address _to,
        uint256 _amount
    ) public whenNotPaused onlyAirdrop {
        totalDistributed = totalDistributed + _amount;
        amountsDistributed[_to] = amountsDistributed[_to] + _amount;
        emit Distribute(_to, _amount);
    }

    /// @notice Take the current unlocked amount
    function redeem() public nonReentrant whenNotPaused returns (uint256) {
        uint256 free = (amountsDistributed[msg.sender] * totalKPI) / 1000;
        if (free <= amountsRedeemed[msg.sender])
            revert CnBCoinVestingEmptyRedeem();
        uint256 redeemAmount = free - amountsRedeemed[msg.sender];
        amountsRedeemed[msg.sender] =
            amountsRedeemed[msg.sender] +
            redeemAmount;
        token.transfer(msg.sender, redeemAmount);
        emit Redeem(msg.sender, redeemAmount);
        return redeemAmount;
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
        if (kpiMap.contains(_code))
            revert CnBCoinVestingKPIAlreadyDefined(_code);
        uint256 pos = kpi.length;
        kpi.push(KPI(_time, _timeStatus, 0, _weight));
        kpiMap.set(_code, pos);
        computeKPI();
        emit KPIAdded(_code, _time, _timeStatus, _weight);
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
        if (!kpiMap.contains(_code)) revert CnBCoinVestingKPINotDefined(_code);
        if (_weight > 1000)
            revert CnBCoinVestingIncorrectWeight(_code, _weight);
        uint256 pos = kpiMap.get(_code);
        kpi[pos].time = _time;
        kpi[pos].timeStatus = _timeStatus;
        kpi[pos].weight = _weight;
        emit KPIModified(_code, _time, _timeStatus, _weight);
        computeKPI();
    }

    /// @notice Update the  KPI value
    /// @param _code The KPI id code
    /// @param _amount the current value of KPI
    function updateKPI(bytes32 _code, uint16 _amount) public restricted {
        if (!kpiMap.contains(_code)) revert CnBCoinVestingKPINotDefined(_code);
        if (_amount > 1000)
            revert CnBCoinVestingIncorrectAmount(_code, _amount);
        uint256 pos = kpiMap.get(_code);
        kpi[pos].current = _amount;
        emit KPIUpdated(_code, _amount);
        computeKPI();
    }

    /// @notice Increase the  KPI value
    /// @param _code The KPI id code
    /// @param _amount the added value of KPI
    function increaseKPI(bytes32 _code, uint16 _amount) public restricted {
        if (!kpiMap.contains(_code)) revert CnBCoinVestingKPINotDefined(_code);
        if (_amount > 1000)
            revert CnBCoinVestingIncorrectAmount(_code, _amount);
        uint256 pos = kpiMap.get(_code);
        uint32 newVal = _amount + kpi[pos].current;
        if (newVal > 1000) newVal = 1000;
        kpi[pos].current = uint16(newVal);
        emit KPIUpdated(_code, kpi[pos].current);
        computeKPI();
    }

    /// @notice Remove the KPI from the list
    /// @param _code The KPI id code
    function removeKPI(bytes32 _code) public restricted {
        if (!kpiMap.contains(_code)) revert CnBCoinVestingKPINotDefined(_code);
        kpiMap.remove(_code);
        emit KPIRemoved(_code);
        computeKPI();
    }

    function computeKPI() internal {
        uint256 kpiLength = kpiMap.length();
        uint256 kpiTotal = 0;
        uint256 pos;
        for (uint256 i = 0; i < kpiLength; i++) {
            (, pos) = kpiMap.at(i);
            if (
                kpi[pos].timeStatus == KPITimeStatus.NotBefore &&
                block.timestamp < kpi[pos].time
            ) continue;
            if (
                kpi[pos].timeStatus == KPITimeStatus.AlwaysAfter &&
                block.timestamp > kpi[pos].time
            ) {
                kpiTotal = kpiTotal + kpi[pos].weight;
                continue;
            }
            kpiTotal = kpiTotal + (kpi[pos].current * kpi[pos].weight) / 1000;
        }
        totalKPI = kpiTotal;
    }
}
