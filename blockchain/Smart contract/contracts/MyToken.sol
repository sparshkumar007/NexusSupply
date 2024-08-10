// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
