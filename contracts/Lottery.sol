// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery {
  // the address of the user who created the contract
  address public manager;

  address[] public players;

  constructor() {
    // sender of the message (current call)
    manager = msg.sender;
  }
}
