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
        const getAllProductsByCategory = async (category)=>{
          try {
            const {data} = await axiosInstance.get(`/products/categories/${category}`);
            setProducts(data);
          } catch (error) {
            toast.error(error.message || "Network Error");
          }
        }
        const deleteProduct = async (id)=>{
          try {
            const {data} = await axiosInstance.delete(`/products/product/delete/${id}`);
            setProducts(data);
          } catch (error) {
            toast.error(error.message || "Network Error");
          }
        }

        const updateProduct = async (id,product)=>{
          try {
            const {data} = await axiosInstance.put(`/products/product/delete/${id}`,{product});
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
    <ProductContext.Provider value={{products,getAllProductsByCategory,deleteProduct,updateProduct}}>
        {children}
    </ProductContext.Provider>
    </>
  )
}

