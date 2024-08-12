const MyToken = artifacts.require("MyToken");

contract("MyToken", (accounts) => {
    let contractInstance;
    let tokenId;

    beforeEach(async () => {
        contractInstance = await MyToken.new();
    });

    it("Tested the mint operation.", async () => {
        let result = await contractInstance.mint(['pencil', 'http://1234', '234'], 100);
        console.log('tokenId: ', result.logs[0].args.value.toString());
        console.log('uint256 tokeId: ', result.logs[0].args.value);
        tokenId = result.logs[0].args.value.toString();
    });
    it("should mint an NFT and retrieve it", async () => {
        let result = await contractInstance.mint(['pencil', 'http://1234', '234'], 100);
        let tokenId = result.logs[0].args.value.toString();

        console.log('Minted tokenId:', tokenId);

        let nft = await contractInstance.getNFT(tokenId);
        console.log('NFT Data:', nft);

        // assert.equal(nft[0], 'pencil', "Name should be 'pencil'");
        // assert.equal(nft[1], 'http://1234', "ImgUrl should be 'http://1234'");
        // assert.equal(nft[2], '234', "Price should be '234'");
    });
});
