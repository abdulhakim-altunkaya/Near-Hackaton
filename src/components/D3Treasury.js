import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ABI} from "./ContractABI.js";
import {CONTRACT_ADDRESS} from "./ContractAddress.js";
import {ethers } from "ethers"; 

function D3Treasury() {
    const navigate = useNavigate();

    let[auroraBalance, setAuroraBalance] = useState();
    let[tokenBalance, setTokenBalance] = useState();
    let[tokenAddress, setTokenAddress] = useState("");

    let contract;
    let signer;
    const ADDRESS = CONTRACT_ADDRESS;
    const CONTRACT_ABI = ABI;

    const connectContract = async () => {
        const Address = ADDRESS;
        const ABI = CONTRACT_ABI;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(Address, ABI, signer);
    }

    const getAuroraBalance = async () => {
        await connectContract();
        const txResponse = await contract.getBalance();
        if(txResponse < 1) {
            setAuroraBalance("Balance is 0");
        } else {
            let data = txResponse.toString();
            let data2 = data.slice(0, -18);
            setAuroraBalance(`Balance is ${data2} `);
        }
    }

    const getTokenBalance = async () => {
        await connectContract();
        const txResponse = await contract.getTokenBalance(tokenAddress);
        await txResponse.wait();
        if(txResponse < 1) {
            setTokenBalance("Balance is 0");
        } else {
            let data = txResponse.toString();
            setTokenBalance(` ${data} `);
        }
    }



    return (
    <div>
        <button className='button-54' onClick={getAuroraBalance} >1. CHECK AURORA BALANCE</button> 
        <p>Aurora Balance: {auroraBalance} </p>
        <br />
        <button className='button-54' onClick={getTokenBalance} >2. CHECK OTHER TOKEN BALANCES</button>
        <br />
        <br />
        <input type="text" value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} placeholder="enter token address" />
        <p>Token Balance: {tokenBalance} </p>
        <br />
        <br />
        <br />
        <button className='button-54' onClick={ () => navigate("/") } >HOMEPAGE</button>
    </div>
)
}

export default D3Treasury