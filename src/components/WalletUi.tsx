//import React, { useState } from 'react';
import { useEffect, useState } from 'react';
import EthSvg  from '../assets/ethereum-eth.svg'
import SolSvg  from '../assets/network-logo-replacement-solana.svg'
import CopySvg from '../assets/copy-icon.svg'
import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet } from "ethers";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import nacl from "tweetnacl";

export const WalletUI = () => {
    
    type CopiedState = {
        [key: string]: boolean;
    };


    const [network, setSelectNetwork] = useState("Ethereum")
    const [isLogoDropdownOpen, setLogoDropdownOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [ethAcc,setEthAcc] = useState(parseInt(localStorage.getItem("ethAccIndex")|| '1'))
    const [solAcc,setSolAcc] = useState(parseInt(localStorage.getItem("solAccIndex")|| '1'))
    const [copied, setCopied] = useState<CopiedState>({});
    const [isWalletDetailsOpen, setIsWalletDetailsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPrivateKey,setShowPrivateKey] = useState(false)
   
   

    const handleShowSecrets = () => {
    setIsModalOpen(true);
  };
    
   let res = GetEthAndSolAccounts(network)
   const [selectedAccount, setSelectedAccount] = useState(res[0]);
   

    useEffect(()=>{
        res =  GetEthAndSolAccounts(network)   
    },[ethAcc])

    useEffect(()=>{
        res =  GetEthAndSolAccounts(network)   
        console.log(res)
    },[solAcc])
    

    const handleDropDown = ()=>{
        setLogoDropdownOpen(!isLogoDropdownOpen)
    }
    const handleClosePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }
  
    const handleSelectedAccount = (account : Account)=>{
        
        setSelectedAccount(account)
        setIsPopupOpen(false);
    }


    const handleCopy = (publicAddress : string) => {
        navigator.clipboard.writeText(publicAddress);
        setCopied(prev => ({ ...prev, [publicAddress]: true }));

        setTimeout(() => {
        setCopied(prev => ({ ...prev, [publicAddress]: false }));}, 1000);
    }

    const handleWalletDetails = () => {
        setIsWalletDetailsOpen(!isWalletDetailsOpen)
        handleClosePopup()
    }

    
    


  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            {isPopupOpen?(<div className="w-80 h-100 p-4 bg-white rounded-lg shadow-lg text-black " style={{ height: '400px' }} >
                
                <div className='flex flex-row items-center '>
                <div className="flex flex-row basis-1/4 bg-gray rounded-lg p-1.5 " onClick={handleClosePopup}><div className=" rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></div></div>
                <div className='basis-1/2  h-6 flex items-center justify-center'>
                    <div ><h2> Wallets</h2></div>
                </div>
                </div>
                
               
                <div className="flex flex-row rounded-lg text-center mb-4 ">
                    <div className='basis-1/4'></div>
                    <div className="basis-1/2 bg-gray-200 top-full hover:bg-gray-300 flex rounded-full  items-center justify-center relative" onClick={handleDropDown}>
                    {network=== "Solana"? <img alt="Solana Network Logo" draggable="false" src={SolSvg}   className="size-5 rounded-full" /> :<img alt="Ethereum Network Logo" draggable="false" src={EthSvg}   className="size-5 rounded-full" />}
                    <span className="text-md ml-1 mr-2"> {network}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"> <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                     {isLogoDropdownOpen && (
                                <div className="absolute left-0 top-full mt-1 bg-gray-100 z-10 border border-gray-300 divide-y divide-gray-300 rounded-md shadow-lg">
                                    <div className="py-1">
                                        <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-300" onClick={()=>{
                                            setSelectNetwork("Solana")
                                            const res =  GetEthAndSolAccounts("Solana")  
                                            setSelectedAccount(res[0]) 

                                        }}>
                                        <img alt="Solana Network Logo" draggable="false" src={SolSvg}   className="size-5 rounded-full" /><span className="ml-2"> Solana</span>
                                         {network === "Solana"?<span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="#4C94FF" className="size-4 ml-2 flex-shrink-0 self-center">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg></span>:""}
                                        </button>

                                        <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-300" onClick={()=>{
                                            setSelectNetwork("Ethereum")
                                            const res =  GetEthAndSolAccounts("Ethereum")  
                                            setSelectedAccount(res[0]) 
                                        }}>
                                        <img alt="Ethereum Network Logo" draggable="false" src={EthSvg} className="size-5 rounded-full" /> 
                                        <span className="ml-2">Ethereum</span>
                                            {network === "Ethereum" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="#4C94FF" className="size-4 ml-2 flex-shrink-0 self-center"> {/* Added ml-2 for spacing and stroke color */}
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        )}
                                        </button>

                                    </div>
                                     <div className="py-1">
                                        <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-300">
                                            <span className="flex items-center space-x-2">
                                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>Add Network
                                            </span>
                                        </button>
                                    </div>
                                </div>
                      ) }
                </div>
                   
                </div>
                 <div className="overflow-y-auto" style={{height:'300px'}}>
                {res.map((account, )=> (<div key={account.name} className={`flex flex-row items-center bg-gray-200 hover:bg-gray-300 rounded-lg mt-2 h-16 ${selectedAccount.name === account.name ? 'border-2 border-blue-400' : ''}`} onClick={()=>{handleSelectedAccount(account)} }>
                    <div className="flex basis-1/5 p-2 justify-center items-center">{network === "Solana"? <img alt="Solana Network Logo" draggable="false" src={SolSvg}   className="size-5 rounded-full" /> :<img alt="Ethereum Network Logo" draggable="false" src={EthSvg}   className="size-5 rounded-full" />}</div>
                    <div className="flex flex-col basis-3/5 p-2 ">
                    <div ><h3 className="text-black">{account.name}</h3></div>
                    <div><span className="text-sm ">{formatAddress(account.publicAddress, 6, 4)}</span></div>
                    </div>
                    <div className="flex flex-row basis-1/5 "> 
                    <div className="flex justify-start items-center hover:bg-gray-400 rounded-full " onClick={(e)=>{
                        e.stopPropagation(); 
                        handleCopy(account.publicAddress)

                    }}>{copied[account.publicAddress]?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#4C94FF" className="size-5  flex-shrink-0 self-center"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>:<img alt="copy svg Logo" draggable="false" src={CopySvg}   className="size-4 " /> }</div> 
                    <div className="flex ml-auto hover:bg-gray-400 rounded-full hover:bg-gray-400 rounded-full"  onClick={(e)=>{
                        e.stopPropagation(); 
                        setIsPopupOpen(false)
                        setIsWalletDetailsOpen(true)
                        handleSelectedAccount(account)
                    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" /></svg></div>
                    </div>
                    
                </div>))}
                


                <div className="py-1">
                    <button className="flex items-center  px-4 py-2 text-sm text-black " onClick={()=>{
                        if (network === "Ethereum"){
                            let ethAccounts = parseInt(localStorage.getItem("ethAccIndex")|| '1')
                            ethAccounts= ethAccounts + 1;
                            setEthAcc(ethAccounts)
                            localStorage.setItem("ethAccIndex", ""+ethAccounts)
                        }else{
                            let solAccounts = parseInt(localStorage.getItem("solAccIndex")|| '1')
                            solAccounts= solAccounts + 1;
                            setSolAcc(solAccounts)
                            localStorage.setItem("solAccIndex", ""+solAccounts)
                        }
                    }}>
                        <span className="flex items-center space-x-2 text-blue-500">
                            <svg className="w-5 h-5 fill-blue-500" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>Add New {network} Network
                            </span>
                    </button>
            </div>
            </div>

                
                
             
            </div> 
          ): isWalletDetailsOpen ? (<div className="w-80 h-100 p-4 bg-white rounded-lg shadow-lg text-black " style={{ height: '400px' }}  onClick={()=>{
                setIsModalOpen(false)
                setShowPrivateKey(false)
            }}>
            <div className='flex flex-row items-center '>
                <div className="flex flex-row basis-1/4 bg-gray rounded-lg p-1.5 " onClick={handleWalletDetails}><div className=" rounded-full hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg></div></div>
                <div className='basis-1/2  h-6 flex items-center justify-center'>
                    <div ><h2>{selectedAccount.name}</h2></div>
                </div>
                </div>
                
                    <div className="basis-1/2 bg-gray-200 hover:bg-gray-300  rounded-lg mt-3" style={{ height: '40px' }} onClick={()=>{
                        handleCopy(selectedAccount.publicAddress)
                    }}>
                        <div className="flex flex-row justify-between items-center h-full px-4">
                        <div className='flex '> Wallet Address </div> 
                        <div className="flex items-center whitespace-nowrap">{formatAddress(selectedAccount.publicAddress, 4, 4)} <span className='ml-2'>{copied[selectedAccount.publicAddress]?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="#4C94FF" className="size-4  flex-shrink-0 self-center"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>:<img alt="copy svg Logo" draggable="false" src={CopySvg}   className="size-4 " /> }</span> </div></div>
                    </div>

                     <div className="basis-1/2 bg-gray-200 hover:bg-gray-300  rounded-lg mt-3" style={{ height: '40px' }} onClick={(e)=>{
                        e.stopPropagation()
                        handleShowSecrets()
                     }}>
                        <div className="flex flex-row justify-between items-center h-full px-4">
                        <div className='flex '> Show Private key </div> 
                        <div className="flex items-center whitespace-nowrap"><span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></span> </div></div>
                    </div>

                    <div className="basis-1/2 bg-gray-200 hover:bg-gray-300  rounded-lg mt-3" style={{ height: '40px' }}>
                        <div className="flex flex-row justify-between items-center h-full px-4">
                        <div className='flex text-red-600'> Remove Wallet </div> 
                        <div className="flex items-center whitespace-nowrap"><span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></span> </div></div>
                    </div>
                    <SecretModal isOpen={isModalOpen}  setIsOpen={setIsModalOpen} setShowPrivateKey={setShowPrivateKey}/>
                    <ShowPrivateKeyModel privateKey={selectedAccount.privateAddress} showPrivateKey={showPrivateKey}  setShowPrivateKey={setShowPrivateKey}/>
                    
                
            </div>):
           <div className="w-80 p-4 h-100 bg-white rounded-lg shadow-lg text-black relative " style={{ height: '400px' }}>
                <div className="flex items-center rounded-lg text-center mb-4 relative">
                    <div className="w-10 bg-white rounded-lg p-1.5"></div>

                    <div className="flex-grow bg-gray-100 mx-2 rounded-lg  text-center relative">
                        <div className="flex relative">
                            <div className="w-10 bg-gray-100 rounded-l-lg hover:bg-gray-300 flex justify-center items-center p-1.5 border border-gray-300 " onClick={handleDropDown}>
                               {network ==="Solana"?<img alt="Solana Network Logo" draggable="false" src={SolSvg}   className="size-6 rounded-full" /> :<img alt="Ethereum Network Logo" draggable="false" src={EthSvg}   className="size-6 rounded-full" /> }

                               {isLogoDropdownOpen && (
                                <div className="absolute left-0 top-full mt-1 bg-gray-100 z-10 border border-gray-300 divide-y divide-gray-300 rounded-md shadow-lg">
                                    <div className="py-1">
                                        <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-300" onClick={()=>{
                                            
                                            setSelectNetwork("Solana")
                                            const res =  GetEthAndSolAccounts("Solana")  
                                            setSelectedAccount(res[0]) 
                                        }}>
                                        <img alt="Solana Network Logo" draggable="false" src={SolSvg}   className="size-5 rounded-full" /><span className="ml-2"> Solana</span>
                                         {network === "Solana"?<span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="#4C94FF" className="size-4 ml-2 flex-shrink-0 self-center">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg></span>:""}
                                        </button>

                                        <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-300" onClick={()=>{
                                            setSelectNetwork("Ethereum")
                                            const res =  GetEthAndSolAccounts("Ethereum")  
                                            setSelectedAccount(res[0]) 
                                        }}>
                                        <img alt="Ethereum Network Logo" draggable="false" src={EthSvg} className="size-5 rounded-full" /> 
                                        <span className="ml-2">Ethereum</span>
                                            {network === "Ethereum" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={2} stroke="#4C94FF" className="size-4 ml-2 flex-shrink-0 self-center"> {/* Added ml-2 for spacing and stroke color */}
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        )}
                                        </button>

                                    </div>
                                     <div className="py-1">
                                        <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-300">
                                            <span className="flex items-center space-x-2">
                                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>Add Network
                                            </span>
                                        </button>
                                    </div>
                                </div>
                               ) }
                            </div>
                            <div className="flex flex-grow bg-gray-100 border-t border-b hover:bg-gray-300 border-gray-300 justify-center items-center " onClick={handleClosePopup}><span className="mr-1">{selectedAccount.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4"> <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                            </div>
                            <div className="w-10 bg-gray-100 rounded-r-lg hover:bg-gray-300 flex justify-center items-center border  border-gray-300" onClick={()=>{
                                navigator.clipboard.writeText(selectedAccount.publicAddress)
                                setCopied(prev => ({ ...prev, [selectedAccount.publicAddress]: true }));
                                setTimeout(() => {
                                setCopied(prev => ({ ...prev, [selectedAccount.publicAddress]: false }));
                                }, 1000);
                            }}>
                                {copied[selectedAccount.publicAddress]?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#4C94FF" className="size-5  flex-shrink-0 self-center"> {/* Added ml-2 for spacing and stroke color */}
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>:<img alt="copy svg Logo" draggable="false" src={CopySvg}   className="size-4 " /> }
                            </div>
                        </div>
                    </div>

                    <div className="w-10 bg-white rounded-lg flex-shrink-0 text-center p-1.5 "></div>
                </div>

                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold">$0.00</h1>
                    <p className="text-gray-400">$0.00 0%</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-around mb-4">
                    <button className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#4C94FF"  className="size-5"> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg>
                        </div>
                        <span className="text-xs mt-2">Receive</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#4C94FF" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" /></svg>
                        </div>
                        <span className="text-xs mt-2">Send</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#4C94FF"  className="size-5 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
</svg>

                        </div>
                        <span className="text-xs mt-2">Swap</span>
                    </button>
                </div>
                
                {/* Ethereum Balance */}
                <div className="flex items-center justify-between mb-20"> {/* Add margin-bottom here */}
                    <div className="flex items-center">
                        {network ==="Solana"?<img alt="Solana Network Logo" draggable="false" src={SolSvg}   className="size-8 rounded-full" /> :<img alt="Ethereum Network Logo" draggable="false" src={EthSvg}   className="size-8 rounded-full" /> }
                        {network === "Solana"? <span className="ml-2">Solana</span>:<span className="ml-2">Ethereum</span>}
                    </div>
                    <div className="text-right">
                        <h2 className="font-bold">$0.00</h2>
                        <p className="text-green-500 text-xs">+3.19%</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-around border-t border-gray-700 pt-4">
                    <button className="flex flex-col items-center text-blue">
                        <span className="text-xs mt-1">Tokens</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-400">
                        <span className="text-xs mt-1">Collectibles</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-400">
    
                        <span className="text-xs mt-1">Activity</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-400">
                        <span className="text-xs mt-1">Explore</span>
                    </button>
                </div>
            </div>}
            
            
        </div>
    );
  
};
 interface Account  {
        name: string;
        publicAddress: string;
        privateAddress: string;
    }

let GetEthAndSolAccounts = (network:string): Account[]=>{
    const accounts: Account[] = [];
    const mnemonic = localStorage.getItem("seedPharse") || ''
    const seed = mnemonicToSeedSync(mnemonic);

    if (network === "Ethereum"){
        const hdNode = HDNodeWallet.fromSeed(seed);
        const ethAccIndex = parseInt(localStorage.getItem("ethAccIndex")|| '1')

        for (let i = 1; i <= ethAccIndex; i++) {
        // Derivation path for Ethereum
            const path = `m/44'/60'/0'/0/${i-1}`; 
  
            const wallet = hdNode.derivePath(path);
            const privateKey = wallet.privateKey; // Private key in hex format
            const address = wallet.address; // Ethereum address (public key));

            let account:Account =  {
                name:'Wallet '+i,
                publicAddress: address,
                privateAddress:privateKey
            }
            accounts.push(account)
        } 
    }             
    else if( network === "Solana"){
        const solAccIndex = parseInt(localStorage.getItem("solAccIndex")|| '1')
        for (let i = 1; i <= solAccIndex ; i++) {
            const path = `m/44'/501'/${i-1}'/0'`; // This is the derivation path
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            //console.log("public Key ", Keypair.fromSecretKey(secret).publicKey.toBase58());
           // console.log("private Key",bs58.encode(Keypair.fromSecretKey(secret).secretKey))
            let account:Account =  {
                name:'Wallet '+i,
                publicAddress: Keypair.fromSecretKey(secret).publicKey.toBase58(),
                privateAddress:bs58.encode(Keypair.fromSecretKey(secret).secretKey)
            }

            accounts.push(account)

        }
    }
   
    
    return accounts

    
}

function formatAddress(address:string, startIndex:number, endIndex:number) {
    return `${address.substring(0, startIndex)}...${address.substring(address.length - endIndex)}`; 
}

type SecretModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setShowPrivateKey: React.Dispatch<React.SetStateAction<boolean>>
};

const SecretModal: React.FC<SecretModalProps>  = ({ isOpen, setIsOpen, setShowPrivateKey }) => {
  if (!isOpen) return null;

  const [isPasswordMatches, setIsPasswordMatches] = useState(false);
  const  verifyPassword = (password: string)=>{
        const savedPassWord = localStorage.getItem("password") || ""

        if (savedPassWord === password){
            setIsPasswordMatches(true)
        }else{
            setIsPasswordMatches(false)
        }
    }

  return (
   <div className="flex fixed inset-0 items-center justify-center bg-gray-100 bg-opacity-50 " style={{ paddingTop: '7%' }}>
  <div className="w-80 bg-white rounded-lg shadow-lg text-black max-h-[80vh] overflow-y-auto">
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Export Secret</h2>
      <p className="text-sm mb-2">On the next page, you will receive your secrets.</p>
      <div className="mt-4">
        <div className="bg-gray-200 rounded-lg p-3 mb-2">
          <p className="text-sm text-red-500">⚠️ Never share your secret or enter it into an app or website.</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-3 mb-2">
          <p className="text-sm text-red-500">⚠️ Anyone with your secret will have complete control of your account.</p>
        </div>
        
        
        <div>
          <input 
            type="password" 
            className={`w-full p-2 bg-gray-100 rounded-lg text-black mb-4 `}
            placeholder="Password" 
            onClick={(e)=>{e.stopPropagation()
            }}
            onChange={(e)=>{
               verifyPassword(e.target.value)
            }}
          />
        </div>
        <button 
          className={` w-full p-2 rounded-lg text-white ${ isPasswordMatches ? "bg-blue-500" : "bg-gray-300" }`} onClick={(e)=>{
            e.stopPropagation()
            setIsOpen(false)
            setShowPrivateKey(true)
          }}  >
          Show secrets
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

type PrivateKeyProps = {
  privateKey: string;
  showPrivateKey:boolean;
  setShowPrivateKey: React.Dispatch<React.SetStateAction<boolean>>
};

const ShowPrivateKeyModel: React.FC<PrivateKeyProps>  = ({ privateKey, showPrivateKey, setShowPrivateKey }) => {
  const [copied, setCopied] = useState(false);

  if (!showPrivateKey) return null;

  return (
   <div className="flex fixed inset-0 items-center justify-center bg-gray-100 bg-opacity-50 " style={{ paddingTop: '7%' }}>
    <div className="w-80 bg-white rounded-lg shadow-lg text-black max-h-[80vh] overflow-y-auto p-4">
        <h2 className="text-xl font-bold text-center mb-4">Private Key</h2>
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

        </div>
        <p className="text-center text-black font-semibold mb-2">Your Private Key</p>
        <p className="text-center text-black mb-4 text-sm">Never give out your private key to anyone.</p>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-black text-s break-all">{privateKey}</p>
        </div>
        <div className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-lg w-full mb-4 flex items-center justify-center" onClick={(e) =>{
            e.stopPropagation()
            navigator.clipboard.writeText(privateKey)
            setCopied(true)
            setTimeout(()=>{
                setCopied(false)
            },1000)
          } }> Copy {copied ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#4C94FF" className="size-4  flex-shrink-0 self-center ml-2"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>:<img alt="copy svg Logo" draggable="false" src={CopySvg}   className="size-4 ml-2 " /> } </div>
        <button className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-lg w-full"> Close </button>
      </div>
</div>
  );
};