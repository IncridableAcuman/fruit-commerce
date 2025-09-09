import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
      const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("accessToken")){
            navigate("/");
        }
    },[navigate]);
  return (
    <>
    <Navbar/>
    <Sidebar/>
    </>
  )
}

export default Home