import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css"

export const VerifyPhrase = () => {
  const [wordNumber] = useState(() => Math.floor(Math.random() * 12) + 1)
  const [inputValue, setInputValue] = useState("")
  const [isWordMatched, setIsWordMatched] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation();

  const { state } = location;

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleNavigation = ()=>{
    if (isWordMatched){
      navigate("/wallet")
    }
  }
  useEffect(()=>{
    const seedPharse = state.seedphrases.split(" ")
    console.log(seedPharse)
    if (inputValue == seedPharse[wordNumber-1]){
        console.log("input value matched")
        setErrMessage("")
        setIsWordMatched(true)

        localStorage.setItem('seedPharse', seedPharse);
        localStorage.setItem("solAccIndex", "1")
        localStorage.setItem("ethAccIndex", "1")
    } else if(isButtonEnabled){
      setErrMessage("Word does not Match")
    }
  }, [inputValue])

  const isButtonEnabled = inputValue.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Verify Phrase</h1>
        <p className="mb-2">
          Enter the following word from your recovery phrase to complete the
          setup process.
        </p>
        <p className="text-lg font-semibold mb-4">Word #{wordNumber}</p>
        <div className="relative">
          <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter the word"
        />
        <p className="error-message">{errMessage}</p> 
        </div>
         <div className="relative">
        <button
          className={`w-full py-2 rounded text-white ${ isButtonEnabled && isWordMatched ? "bg-blue-500" : "bg-gray-300" }`} disabled={!isButtonEnabled} onClick={handleNavigation}>
          Verify & Complete
        </button>
        </div>
        <div className="flex justify-center mt-1">
          <button className="mt-4 text-[#72727A] hover:underline" onClick={handleNavigation}>Start Over</button>
        </div>
        
      </div>
    </div>
  );
};

