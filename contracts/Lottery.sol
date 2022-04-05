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

  // pick a winner by taking the modulo (%) of random() and the number of players
  function pickWinner() public {
    uint index = random() % players.length;

    // the winner is the player at the index of random() % numPlayers
    // send all the money in the contract to the winner
    payable(players[index]).transfer(getBalance());

    players = new address[](0);
  }

  // get contract balance
  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function getPlayerBalance(address player) public view returns (uint) {
    return player.balance;
  }

  // generates a pseudo random number leveraging the block difficulty, timestamp and the players array
  function random() private view returns (uint) {
    return uint(
      keccak256(
        abi.encodePacked(
          block.difficulty,
          block.timestamp,
          players
        )
      )
    );
  }
}
