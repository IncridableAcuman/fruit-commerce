import { createContext, useCallback, useContext, useEffect, useState } from "react"
import axiosInstance from "../api/axiosInstance";
import { UseAuth } from "./AuthProvider";
import { toast } from "react-toastify";


const CartContext=createContext();
export const UseCart = ()=> useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cart,setCart]=useState(null);
    const {user}=UseAuth();

    const getCartForUser = useCallback(async ()=>{
      try {
        if(!user?.id) return;
        const {data} = await axiosInstance.get(`/carts/cart/${user.id}`);
        setCart(data);
      } catch (error) {
        console.log(error);
      }
    },[user?.id]);

    const addToCart = async (productId,quantity)=>{
      try {
        const {data} = await axiosInstance.post('/carts/cart/add',null,{params:{
          userId:user?.id,
          productId,
          quantity
        }});
        setCart(data);
        getCartForUser();
        toast.success("Added to cart");
      } catch (error) {
        console.log(error);
      }
    }

    const removeCart = async (productId)=>{
      try {
        const {data} = await axiosInstance.delete('/carts/cart/remove',{
          params:{
            userId:user?.id,
            productId
          }
        });
        setCart(data);
        getCartForUser();
        toast.success("Success");
      } catch (error) {
        console.log(error);
        toast.error("Network Error");
      }
    }

    const clearCart = async ()=>{
      try {
         await axiosInstance.delete("/carts/cart/clear",{
          params:{
            userId:user?.id
          }
        });
        setCart(null);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getCartForUser();
    },[getCartForUser]);

  return (
    <>
    <CartContext.Provider value={{cart,addToCart,removeCart,clearCart}}>
        {children}
    </CartContext.Provider>
    
    </>
  )
}