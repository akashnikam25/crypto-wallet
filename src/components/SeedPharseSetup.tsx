import { generateMnemonic } from "bip39";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
    interface Window {
        Buffer: typeof Buffer;
    }
}

if (typeof window !== "undefined") {
    window.Buffer = Buffer;
}

export const SeedPhraseSetup = () => {
    const [seedPhrases, setSeedPharses] = useState(generateMnemonic().split(" "));
    const [newSeedPharse,setNewPharse] = useState(false)
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate()

    const handleNavigation = ()=>{
        const data = {seedphrases:seedPhrases.join(" ")}
        navigate("/verify-pharse",{state:data} )
    }


    useEffect(()=>{
        if (newSeedPharse){
            setSeedPharses(generateMnemonic().split(" "))
        }
        setNewPharse(false)
    },[newSeedPharse])
 
    const generateNewSeedPharse = ()=>{
        setNewPharse(true)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(seedPhrases.join(" ")).then(
            () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            },
            (err) => {
                console.error('Failed to copy: ', err);
            }
        );
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        
         <h2 className="text-xl font-semibold mb-4">Setup Your Secure Passphrase</h2>
                <p className="mb-4 text-sm text-gray-600">
                    Write down the following words in order and keep them somewhere safe.
                    <span> Anyone with access to it will also have access to your account! </span>
                    You'll be asked to verify your passphrase next.
                </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {seedPhrases.map((word, index) => (
            <div key={index} className="flex items-center justify-center bg-blue-100 text-blue-800 font-medium rounded-lg py-2">
              {index + 1}. {word}
            </div>
          ))}
        </div>
        <div className="flex justify-between mb-6">
          <button className="bg-[#F0f0f1] text-[#0072CE] px-4 py-2 rounded-lg font-semibold" onClick={handleCopy}>
            Copy
          </button>
          {copied && (<div style={{ marginTop: '10px', color: 'green' }}> Copied! </div> )}
          <button className="bg-[#F0f0f1] text-[#0072CE] px-4 py-2 rounded-lg font-semibold" onClick={generateNewSeedPharse}>
            Generate New
          </button>
        </div>
        <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold" onClick={handleNavigation}>
          Continue
        </button>
      </div>
    </div>
  );
};
