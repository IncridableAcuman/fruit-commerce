import { LogOut, Menu, Search, ShoppingBasket, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false);
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
    <div className='fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-32 py-4 gap-2 bg-white z-50'>
      <div className="text-2xl font-semibold text-green-600">Logo</div>

      <div className="hidden md:flex items-center gap-3">
        <Link>Home</Link>
        <Link>Menu</Link>
        <Link>Contact Us</Link>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <Search className='text-green-700 cursor-pointer'/>
        <ShoppingBasket className='text-green-700 cursor-pointer'/>
         <LogOut className='text-green-700 cursor-pointer' onClick={handleSubmit} />
        <button 
        className='md:hidden'
        onClick={()=>setIsOpen(!isOpen)} 
        aria-label={"Toggle menu"}>
          {isOpen ? <X/> : <Menu/>}
        </button>
      </div>

    {
      isOpen && (
        <div className="absolute top-full bg-white right-0 text-black shadow-md flex flex-col items-center py-4 px-5 gap-4 md:hidden">
          <Link onClick={()=>setIsOpen(false)}>Home</Link>
          <Link onClick={()=>setIsOpen(false)}>Menu</Link>
          <Link onClick={()=>setIsOpen(false)}>Contact Us</Link>
        </div>
      )
    }

    </div>
  )
}

export default Navbar