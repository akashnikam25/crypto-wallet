import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create } from "./components/Create";
import { Home } from "./components/Home";
import { SeedPhraseSetup } from "./components/SeedPharseSetup";
import { VerifyPhrase } from "./components/VerifyPharse";
import { WalletUI } from "./components/WalletUi";
import { RecoverSeedPharse } from "./components/RecoverSeedPharse";



export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/create" element={<Create/>}></Route>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/setup-passphrase-new-account" element={<SeedPhraseSetup/>}></Route>
    <Route path="/verify-pharse" element={<VerifyPhrase/>}></Route>
    <Route path="/wallet" element={<WalletUI/>}></Route>
    <Route path="/recover-seed-pharse" element={<RecoverSeedPharse/>}></Route>
    </Routes>
   </BrowserRouter>

  
    </>
  )
}