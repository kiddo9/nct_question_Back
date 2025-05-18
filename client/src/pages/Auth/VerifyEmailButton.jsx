import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';

const VerifyEmailButton = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [role, setRole] = useState('')

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      
    }

    const query = useQuery();
    const token = query.get("verificationToken");

    useEffect(() => {
        async function getCredentials(){
            try {
                const response = await Api.get(`/emailVerification?token=${token}`)
                
                {/* If token is invalid or user is already verified */}
                if(response.data.status !== true){
                    nav('/auth/admin/login')
                    return
                }

                {/* if the response status is truety, he is not verified, then the user we can use his credentials */}
                setEmail(response.data.cred.email)
                setId(response.data.cred.id)
                setRole(response.data.cred.role)
                
            } catch (error) {
                toast.error('Something went wrong')
                console.log(error)
                // nav('/auth/admin/login')
            }
        }
        getCredentials()
        
    }, [nav, token])

    {/* Button Click Function to verify email */}
    const verifyEmail = async () => {
        try {
            const response = await Api.patch(`/verifyEmail`, {email, id, role})
            if(response.data.status !== true){
                toast.error(response.data.message)
                return
            }
            toast.success(response.data.message)
            {/* User goes on to reset his or her password */}
            nav('/auth/admin/reset?newPassword=true')
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }   
    }
  return (
    <div className=" h-screen pb-10 pt-20 flex mx-auto">
        <ToastContainer/>
        <div className="rounded-[20px] flex flex-col max-w-[400px] w-full slideDown p-10 transition-opacity duration-300 ease-in shadow-2xl h-fit bg-white/30 backdrop-blur-xs my-auto  mx-auto">
            <h1 className='text-3xl mx-auto font-bold'>Email Verification</h1>
            <p className='text-sm mx-auto mb-5 '>Click the button below to verify your email</p>
            <button onClick={verifyEmail} className="bg-[#6699ff] hover:bg-blue-700 active:bg-blue-900 hover:shadow-lg transition duration-200 ease-in text-white font-bold py-2 max-h-[50px] mx-auto cursor-pointer w-full  px-4 rounded-lg">
                Verify Email
            </button> 
        </div>
    </div>
    
  )
}

export default VerifyEmailButton