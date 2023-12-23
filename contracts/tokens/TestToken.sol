pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor(address owner) ERC20("TestToken", "TTT") {
        _mint(owner, 100000 * 10 ** decimals());
    }

    function mint(address account, uint256 value) public {
        _mint(account, value);
    }
}
