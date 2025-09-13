import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const ProductContext=createContext();
export const UseProduct=()=> useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [products,setProducts]=useState([]);

        const getProducts = async ()=>{
                try {
                const {data} = await axiosInstance.get("/products/data/all");
                setProducts(data);
                } catch (error) {
                toast.error(error.message || "Network Error");
                }
        }

    useEffect(()=>{
          getProducts();
    },[]);

  return (
    <>
    <ProductContext.Provider value={{products}}>
        {children}
    </ProductContext.Provider>
    </>
  )
}

