import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const AuthContext=createContext();

 const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);

    const getMe = async ()=>{
        try {
            const {data} = await axiosInstance.get("/auth/me");
            setUser(data)
        } catch (error) {
            toast.error(error.message || "Network Error");
        }
    }

  return (
    <>
    <AuthContext.Provider value={{user,getMe}}>
        {children}
    </AuthContext.Provider>
    </>
  )
}


export {AuthProvider,AuthContext}