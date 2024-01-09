//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract MockChainlink {
  int256 private value;

  constructor(int256 _value) {
    value = _value;
  }

  function latestAnswer() external view returns (int256) {
    return value;
  }

  function decimals() external pure returns (uint8) {
    return 6;
  }
}
