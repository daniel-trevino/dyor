pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import 'hardhat/console.sol';

contract TestContract {
  event SetMessage(address sender, string purpose);

  string public message = 'DYOR and get started!';

  constructor() {}

  function setMessage(string memory newMessage) public {
    message = newMessage;
    console.log(msg.sender, 'set message to', message);
    emit SetMessage(msg.sender, message);
  }
}
