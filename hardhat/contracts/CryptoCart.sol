// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CryptoCart {
    string public name;
    address public owner;

    constructor() {
        name = "CryptoCart";
        owner = msg.sender;
    }
}
