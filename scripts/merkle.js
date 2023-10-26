const { ethers } = require('ethers');
const { merkleRoot } = require("./tree.json");
const fs = require("fs");

const infuraUrl = '';
const privateKey = '';
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "EthTransferFailed", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "required", "type": "uint256" }, { "internalType": "uint256", "name": "provided", "type": "uint256" }], "name": "FeeNotMet", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "NotAuthorizedToWhitelist", "type": "error" }, { "inputs": [], "name": "NotContract", "type": "error" }, { "inputs": [], "name": "ZeroAddress", "type": "error" }, { "inputs": [], "name": "ZeroAmount", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "uniV2Router", "type": "address" }, { "indexed": false, "internalType": "address", "name": "uniV2Pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "feesUsd", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "companyWallet", "type": "address" }], "name": "FeesChange", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": false, "internalType": "address", "name": "vestingAddr", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "VestingCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "wallet", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "noFee", "type": "bool" }], "name": "WhiteListUpdated", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WHITELIST_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "companyWallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" }, { "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "name": "createVesting", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "feelessTokens", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feesInUSD", "outputs": [{ "internalType": "uint96", "name": "", "type": "uint96" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "getFeeInETH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isWethFirst", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_uniV2Router", "type": "address" }, { "internalType": "address", "name": "_uniV2Pair", "type": "address" }, { "internalType": "uint96", "name": "_feesInUSD", "type": "uint96" }, { "internalType": "address", "name": "_companyWallet", "type": "address" }], "name": "setFeeParams", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "bool", "name": "feeless", "type": "bool" }], "name": "setFeelessToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniV2Pair", "outputs": [{ "internalType": "contract IUniswapV2Pair", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uniV2Router", "outputs": [{ "internalType": "contract IUniswapV2Router02", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "wallet", "type": "address" }, { "internalType": "bool", "name": "noFee", "type": "bool" }], "name": "updateWhitelist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usdTokenAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "whitelistedWallets", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }];
const jsonString = fs.readFileSync('tree.json', 'utf8');
const jsonObject = JSON.parse(jsonString);
const merkle = jsonObject.tree[0];
const root = merkle;

const Contractaddress1 = "0x6e0A5026dD2f730C6F4223031aCfA1b8bf35a840";
const tokenAddress = "0x4A7c80Ddd2bD2d18568b7DdA8559aa660A6e48e8";

console.log(root);

const value = '10000'

const contract = new ethers.Contract(Contractaddress1, abi, wallet);
const contract1 = new ethers.Contract(Contractaddress1, abi, provider);

const eventSignature = contract1.interface.getEvent('VestingCreated');


const filter = {
    address: Contractaddress1,
    topics: [eventSignature.topics],
};

(async () => {
    try {
        const tx = await contract.createVesting(tokenAddress, root, value);

        const receipt = await tx.wait();
        console.log('Transaction receipt:', receipt);


        provider.getLogs(filter).then((logs) => {
            logs.forEach((log) => {
                const parsedLog = contract.interface.parseLog(log);
                console.log("Received event data:", parsedLog.values);
            });
        });


    }
    catch (error) {
        console.error('Error sending transaction:', error);
    }
})();
