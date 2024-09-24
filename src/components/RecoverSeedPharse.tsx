import { useState } from "react"
import { validateMnemonic } from "bip39";

import "../App.css"
import { useNavigate } from "react-router-dom";

export const RecoverSeedPharse = ()=>{
     const [errMsg, setErrMsg] = useState("")
     const [isButtonEnabled, setButtonEnabled] = useState(false)
     const [value, setValue] = useState("")
     const navigate = useNavigate()

     const InputValue = (val:string)=>{
         if (val.length > 0 ){
            setButtonEnabled(true)
            setValue(val)
         }else {
            setButtonEnabled(false)
         }

     }
     const VerifyPharse = ()=>{
        const seedPharse = value.split(" ")
        if (seedPharse.length !== 12){
          setErrMsg("Provided seed phrase must be at least 12 words long")
        }else{
         setErrMsg("")
         const isValid = validateMnemonic(value)

          if (isValid) {
               console.log("The seed phrase is valid according to BIP-39.");
               localStorage.setItem('seedPharse', value);
               localStorage.setItem("solAccIndex", "1")
               localStorage.setItem("ethAccIndex", "1")
               setErrMsg("")
               navigate("/wallet")
            } else {
               setErrMsg("The seed phrase is invalid.");
            }

        }
     }
     
     return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-[500px]">
        
         <div>
            <h2 className="text-2xl font-semibold mb-2 items-center">Recover Using Passphrase</h2>
                <p className="mb-4 text-sm text-gray-600">Enter the backup passphrase associated with the account.</p>
           
         </div>

         <div className="mt-4">
             <h4 className="text-lg ">Passpharse (12 Words)</h4>
          <div className="relative">
            <input type="text" name=""  placeholder="correct horse battery staple..." className="w-full p-2 border border-gray-300 rounded-lg" onChange={(e)=>{
               InputValue(e.target.value)
            }} />  
            <p className="error-message h-4">{errMsg}</p> 
         </div>
         <div className="flex flex-col mt-2">
           
      <button className={`w-full p-3 border border-gray-300 rounded-xl text-white
          text-lg font-semibold ${isButtonEnabled?"bg-blue-500":"bg-gray-300  cursor-not-allowed pointer-events-none"}`} onClick={VerifyPharse}>Import Account</button>
         </div>
         </div>
        
      </div>
    </div>
}