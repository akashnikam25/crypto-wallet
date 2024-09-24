
export const Home = ()=>{

    return <>
 
   <div className="flex items-center justify-center min-h-screen bg-white ">
    <div className="flex flex-col items-center  sm:flex-row sm:justify-between sm:px-8 bg-white">
  <div className="w-80  p-4 bg-white text-black " style={{ height: '400px' }} >
  <div className="text-center h-[400px] max-h-full flex flex-col justify-between" >
    <div>
    <h1 className="text-lg font-bold text-gray-800 mb-2">Welcome to Cyrpto Wallet</h1>
    <p className="text-m text-gray-600">Let's get Started</p>
  </div>
    <div className="flex flex-col mt-20 ">
      <a
        href="http://localhost:5173/create"
        className="bg-blue-600 text-white text-lg font-semibold p-3 rounded-lg mb-4 over:bg-blue-700 transition duration-300">
        Create Account
      </a>
      <a
        href="http://localhost:5173/recover-seed-pharse"
        className="bg-gray-300 text-gray-800 text-lg font-semibold p-3 rounded-lg hover:bg-gray-400 transition duration-300" >
        Import Account
      </a>
    </div>
  </div>
</div>
</div>
</div>
</>
}

