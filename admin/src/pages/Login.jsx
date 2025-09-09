import { Lock, Mail, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axiosInstance from '../../../frontend/src/api/axiosInstance';

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axiosInstance.post('/auth/login',{email,password});
            localStorage.setItem("accessToken",data.accessToken);
            toast.success("Successfully");
            navigate("/");
        } catch (error) {
            toast.error(error?.message || "Network Error");
            localStorage.removeItem("accessToken");
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("accessToken")){
            navigate("/");
        }
    },[navigate]);

  return (
    <>
    <div className="w-full h-screen bg-image">
        <div className="bg-gray-900 text-white w-full h-screen opacity-70">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-full max-w-md text-center">
                    <h1 className='text-2xl lg:text-4xl pb-3 font-semibold'>Login</h1>
                    <p className='pb-3'>Please enter your email and password</p>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 border p-3">
                            <Mail/>
                            <input type="email"
                             name="email"
                              id="email"
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                               placeholder='Your Email'
                               className='outline-none w-full bg-transparent'
                               required
                                />
                        </div>
                        <div  className="flex items-center gap-3 border p-3">
                            <Lock/>
                            <input type="password"
                             name="password"
                              id="password"
                              value={password}
                              onChange={(e)=>setPassword(e.target.value)}
                               placeholder='Password'
                               className='outline-none w-full bg-transparent'
                               required
                                />
                        </div>
                        <div  className="flex items-center justify-center gap-3 border p-3
                         cursor-pointer hover:bg-gray-50 transition duration-300 hover:text-gray-900">
                            <Send/>
                            <button>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login