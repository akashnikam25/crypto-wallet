import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import "../App.css"

export const Create = ()=>{
    const navigate = useNavigate();

    const [formInput, setFormInput] = useState({
        password:"",
        confirmPassword:"",
        success:false
    });

    const [formErr, setFormError] = useState({
        password:"", 
        confirmPassword:"",
    })

    const handleUserInput = (name:string, value:string) =>{
        setFormInput({
            ...formInput,
            [name]:value
        })
    }

    const validateFormInput =(event: React.ChangeEvent<HTMLInputElement>) =>{
         event.preventDefault(); 

         let inputErr ={
            password:"",
            confirmPassword:""
         }

         if (!formInput.password){
            setFormError({
                ...inputErr,
                password:"Password should not be empty"
            })
            return;
         }
         if (formInput.password && !formInput.confirmPassword){
            setFormError({
                ...inputErr,
                confirmPassword:"Confirm Password should not be empty"
            })
            return;
         }

         if (formInput.password !== formInput.confirmPassword){
            setFormError({
                ...inputErr,
                confirmPassword:"Password & Confirm password should be the same   "
            })
            return;
         }
         setFormError(inputErr);
         setFormInput({
            ...formInput,
            success:true
         })
    }


    const handleClick = () => {
        if(formInput.success){
            localStorage.setItem('password', formInput.password);
            navigate('/setup-passphrase-new-account');  
        }
       
    };

    return<>
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-80 h-100 p-4 bg-white rounded-lg shadow-lg text-black " style={{ height: '350px' }}  >
             <div  className="flex flex-col justify-center items-center mb-8">
                <h1 className="text-2xl font-bold">Create a Password</h1>
                <h2 className="text-m text-gray-600 items-center">You will use this to unlock your wallet.</h2>
             </div>
              <div className="my-4">
                <div className="relative">
                    <form onSubmit={validateFormInput}>
                     <div className="relative">
                        <input type="password" name="password"  placeholder="Enter Password" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>{handleUserInput(e.target.name, e.target.value)}} />  
                        <p className="error-message h-2">{formErr.password}</p> 
                     </div>
                     
                     <div className="mt-4">
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded" onChange={(e)=>{handleUserInput(e.target.name, e.target.value)}} /> 
                        <p className="error-message h-2">{formErr.confirmPassword}</p> 
                    </div>

                    <div className="mt-8 flex justify-center items-center">
                        <input type="Submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 " value="Next" onClick={handleClick}/>
                    </div>
                    </form>
               </div>
              </div>
        </div>
        </div>
    </>
}