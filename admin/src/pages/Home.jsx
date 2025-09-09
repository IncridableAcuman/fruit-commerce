import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
      const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("accessToken")){
            navigate("/");
        }
    },[navigate]);
  return (
    <>
    a
    </>
  )
}

export default Home