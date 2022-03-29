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
  // when someone wants to join the lottery, it is expected that the player sends ether along
  function enter() public payable {
    // requires to send a minimum of 1 wei
    require(msg.value > 1 wei);

    // add the sender to the list of players
    players.push(msg.sender);
  }
}
