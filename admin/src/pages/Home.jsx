import { X } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
      const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            navigate("/login");
        }
    },[navigate]);
  return (
    <>
    <div className="w-full min-h-screen mx-auto padd">
      <p className='text-lg pb-4'>All Foods List</p>
      <div className="overflow-x-auto">
        <table className='w-full max-w-6xl mx-auto border border-gray-400 rounded-md shadow-md'>
          <thead className='bg-gray-100'>
            <tr className='text-sm text-gray-500 border'>
              <th className='px-4 py-3 text-left'>Image</th>
              <th className='px-4 py-3 text-left'>Name</th>
              <th className='px-4 py-3 text-left'>Category</th>
              <th className='px-4 py-3 text-left'>Price</th>
              <th className='px-4 py-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border bg-gray-50'>
              <td className='px-4 py-3'><img src="./food_1.png" alt="food" className='w-12 h-12 object-cover rounded-md' /></td>
              <td className='px-4 py-3'>Grek Food</td>
              <td className='px-4 py-3'>Salad</td>
              <td className='px-4 py-3'>12$</td>
              <td className='px-4 py-3 cursor-pointer text-gray-300 hover:text-gray-500 transition duration-300'><X size={20} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Home