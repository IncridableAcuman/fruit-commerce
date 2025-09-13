import React, { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';

const AuthContext=createContext();
export const UseAuth = ()=>useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null);

  const getMe = async ()=>{
    try {
      const {data} = await axiosInstance.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  useEffect(()=>{
    getMe();
  },[]);

  return (
    <>
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
    </>
  )
}

