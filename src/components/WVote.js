import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ABI } from "./ContractABI";
import { CONTRACT_ADDRESS } from "./ContractAddress";
import { ethers } from "ethers";
 
function WVote() {
    const navigate = useNavigate();




    //connect to contract block
    let contract;
    let signer;
    const CONTRACT_ABI = ABI;
    const ADDRESS = CONTRACT_ADDRESS;
    const connectContract = async () => {
        const ABI = CONTRACT_ABI;
        const Address = ADDRESS;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(Address, ABI, signer);
    }

    //Get main proposal
    let[proposal, setProposal] = useState("");
    const getMain = async () => {
        connectContract();
        const txResponse = await contract.mainProposal();
        if(txResponse === "") {
            setProposal("There is no proposal yet");
        } else{
            setProposal(txResponse);
        }
    }

    //cast your vote
    const votingYes = async () => {
        connectContract();   
        const txResponse = await contract.mainProposal();
        if(txResponse === "") {
            alert("There is no proposal to vote for");
        } else{
            const txResponse = await contract.voteYes();
            await txResponse.wait();
        }
    }
    const votingNo = async () => {
        connectContract();
        const txResponse = await contract.mainProposal();
        if(txResponse === "") {
            alert("There is no proposal to vote for");
        } else{
            const txResponse = await contract.voteNo();
            await txResponse.wait();
        }
    }

    let[votingStatus, setVotingStatus] = useState("");
    const getStatus = async () => {
        await connectContract();
        const txResponse = await contract.getVotingStatus();
        if(txResponse === true) {
            setVotingStatus("Yes, you have already voted")
        } else {
            setVotingStatus("No, you have not voted yet");
        }
    }

  return (
    <div>
        <button className='button-54' onClick={getStatus}>See if you voted</button>
        <p><strong>Voting Status:</strong> {votingStatus}</p>
        <button className='button-54' onClick={getMain}>See Main Proposal</button>
        <p> <strong>Main Proposal:</strong> {proposal}</p>
        <div>
            <button className='buttonyellow' onClick={votingYes}>Yes</button>
            <button className='buttonyellow' onClick={votingNo}>No</button>
        </div>
        <br />
        <button className='button-54' onClick={ () => navigate("/") }>Homepage</button>
    </div>
  )
}

export default WVote;