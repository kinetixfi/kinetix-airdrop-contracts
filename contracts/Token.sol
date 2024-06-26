//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20("Token", "TKN") {
    constructor(uint256 initialSupply) {
        _mint(msg.sender, initialSupply);
    }
}
