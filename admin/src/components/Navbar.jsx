import { LogOut, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../frontend/src/api/axiosInstance';
import {toast} from 'react-toastify';

const Navbar = () => {
      const navigate=useNavigate();


    const handleSubmit = async ()=>{
      try {
        await axiosInstance.post("/auth/logout");
        localStorage.removeItem("accessToken");
        toast.error("Logged out.");
        navigate("/login");
      } catch (error) {
         toast.error(error.message || "Network Error");
      }
    }
  return (
    <div className='flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-10 border-b bg-white'>
        <h1 className='text-2xl lg:text-3xl text-green-600'>Logo</h1>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-green-600 cursor-pointer">
            <UserRound/>
            <LogOut onClick={handleSubmit} />
        </div>
    </div>
  )
}

export default Navbar