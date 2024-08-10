import dotenv from "dotenv";
import express from "express";
import Web3 from "web3"
import { ContractAddress, ContractABI } from "./assets/contract.js";

const app = express();
dotenv.config();


const port = process.env.PORT || 3000;

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

const connectToBlockchain = async () => {
    try {
        // if (window.ethereum) {
        // const provider = new ethers.provider.Web3Provider(window.ethereum);
        // await provider.send('eth_requestaccounts', []);
        // const signer = provider.getSigner();

        // console.log('Address of connected signer: ', signer.getAddress());

        // } else {
        //     throw new Error("Metamask not found");
        // }
        console.log('contract address: ', ContractAddress);
        console.log('contract abi: ', ContractABI)
        const contractList = new web3.eth.Contract(ContractABI, ContractAddress);
        console.log('smart contract functions: ', contractList.methods);
        const accounts = await web3.eth.getAccounts();
        let response = await contractList.methods.set(23).send({ from: accounts[0] });
        console.log('response1 from smart contract: ', response);
        response = await contractList.methods.get().call();
        console.log('response2 from smart contract: ', response);

    } catch (error) {
        console.log('Error caught in connectToBlockchain: ', error);
    }
}
connectToBlockchain();

app.listen(port, () => {
    console.log(`Blockchain Server is listening at port ${port}...`);
})