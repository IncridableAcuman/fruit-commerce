import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
const ForgotPassword = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axiosInstance.post("/auth/forgot-password",{email});
      toast.success(data);
    } catch (error) {
      toast.error(error.message || error?.response?.message);
    }
  }

  return (
    <>
    <div className="w-full h-screen bg-image">
      <div className="bg-gray-900 text-white h-screen opacity-90">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-black p-4 w-full max-w-md shadow-md rounded-md">
            <form className='space-y-4' onSubmit={handleSubmit}>
            <h1 className='text-center text-2xl lg:text-4xl p-2'>Forgot Password</h1>
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
            <div  className="flex items-center justify-center gap-3 border p-3
                         cursor-pointer hover:bg-gray-50 transition duration-300 hover:text-gray-900">
                            <Send/>
                            <button>Forgot Password</button>
                        </div>
          </form>
          <p className='text-sm text-center p-2'>Go to {" "} 
            <span className='underline cursor-pointer' onClick={()=>navigate("/login")}>Login</span></p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword