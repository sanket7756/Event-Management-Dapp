// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Admin {
    address contractOwner;

    constructor() {
        contractOwner = payable(msg.sender);
    }
}
