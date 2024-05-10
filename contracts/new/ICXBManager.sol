// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Defines the contract for the airdrop with the optional attach to the vesting
 * If the vesting contract address is set, tokens will be transferred to the vesting contract,
 * othervise to the airdrop target
 */

interface ICXBManager {
    error IncorrectTaxValue(uint256 tax);
    event Whitelisted(address indexed account);
    event UnWhitelisted(address indexed account);
    event Freezed(
        address indexed account,
        uint256 indexed current,
        uint256 amount
    );
    event UnFreezed(
        address indexed account,
        uint256 indexed current,
        uint256 amount
    );
    event TaxDefined(uint256 indexed tax);

    function getFrozenAmount(address target) external view;

    function tax(address target, uint256 amount) external view;

    function permitted(
        address target,
        uint256 amount,
        uint256 total
    ) external view;

    function whitelisted(address target) external view returns (bool) ;


    function whitelist(address target) external;

    function unWhitelist(address target) external;

    function freeze(address target, uint256 amount) external;

    function unFreeze(address target, uint256 amount) external;

    function defineTax(uint256 amount) external;
}
