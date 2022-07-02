pragma solidity 0.8.7;
//SPDX-License-Identifier: MIT
import "hardhat/console.sol";

contract TestContract {
  string public message = "DYOR and get started!";

  event SetMessage(address sender, string purpose);

  /* solium-disable-next-line */
  constructor() {}

  function setMessage(string memory newMessage) public {
    message = newMessage;
    console.log(msg.sender, "set message to", message);
    emit SetMessage(msg.sender, message);
  }
}
