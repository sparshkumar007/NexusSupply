// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    event DataLogged(string message, uint256 value);
    event DataLogged2(string message, string name, string imgUrl, string price);
    event DataLogged3(string message, string name, string imgUrl, string price);

    struct Metadata {
        string name;
        string imgUrl;
        string price;
    }

    struct Ownership {
        address owner;
        uint256 amount;
    }

    mapping(uint256 => Metadata) private NFTs;
    mapping(uint256 => Ownership[]) private owners;
    address private contract_owner;

    constructor() {
        contract_owner = msg.sender;
    }

    uint256 private randNonce = 0;

    function randMod() private returns (uint256) {
        randNonce++;
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce)));
    }

    modifier onlyOwner() {
        require(msg.sender == contract_owner, "Only owner can perform this task");
        _;
    }

    function mint(string[] memory data, uint256 amount) public onlyOwner returns (uint256) {
        require(data.length > 2, "Insufficient Data");
        uint256 tokenId = randMod();
        emit DataLogged("Assigned value of tokenId: ", tokenId);
        Metadata memory obj;
        obj.name = data[0];
        obj.imgUrl = data[1];
        obj.price = data[2];

        Ownership memory obj2;
        obj2.owner = msg.sender;
        obj2.amount = amount;

        NFTs[tokenId] = obj;
        owners[tokenId].push(obj2);

        return tokenId;
    }

    function addAmount(uint256 tokenId, uint256 amount) public onlyOwner returns (bool) {
        Ownership[] storage arr = owners[tokenId];
        require(arr.length >= 1, "Invalid tokenId");

        bool found = false;
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].owner == msg.sender) {
                found = true;
                arr[i].amount += amount;
                break;
            }
        }
        if (!found) {
            Ownership memory obj;
            obj.owner = msg.sender;
            obj.amount = amount;
            arr.push(obj);
        }
        return true;
    }

    function transfer(address to, uint256 tokenId, uint256 amount) public returns (bool) {
        Ownership[] storage arr = owners[tokenId];
        if (arr.length < 1) {
            return false;
        }
        uint256 senderIndex = type(uint256).max;
        uint256 receiverIndex = type(uint256).max;
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].owner == msg.sender) {
                senderIndex = i;
            }
            if (arr[i].owner == to) {
                receiverIndex = i;
            }
        }
        if (senderIndex == type(uint256).max || receiverIndex == type(uint256).max) {
            return false;
        }
        if (arr[senderIndex].amount < amount) {
            return false;
        }
        arr[senderIndex].amount -= amount;
        arr[receiverIndex].amount += amount;

        return true;
    }

    function getNFT(uint256 tokenId) public view returns (string memory name, string memory imgUrl, string memory price) {
        Metadata memory NFT = NFTs[tokenId];
        // emit DataLogged("token Id received: ", tokenId);
        // emit DataLogged3("NFT found:", NFT.name, NFT.imgUrl, NFT.price);
        return (NFT.name, NFT.imgUrl, NFT.price);
    }
}
