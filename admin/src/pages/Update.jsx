import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';

const Update = () => {
    const fileInputRef=useRef(null);
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState(0.0);
    const [image,setImage]=useState(null);
    const [category,setCategory]=useState('');
    const{id}=useParams();

  const handleUploadClick=()=>{
    fileInputRef.current?.click();
  }
  const handleFileChange=(e)=>{
    const file=e.target.files?.[0];
    if(file){
      setImage(file);
    }
  }

  const handleSubmit = async (e)=>{
    if (!image) {
        toast.error("Please upload an image!");
        return;
        }

    e.preventDefault();
    try {
          const formData=new FormData();
          formData.append("title",title);
          formData.append("description",description);
          formData.append("price",price);
          formData.append("image",image);
          formData.append("category",category);
      const {data} = await axiosInstance.put(`/products/product/update/${id}`,formData);
      if(data){
        toast.success("Updated successfully ✅");
          setTitle('');
          setDescription('');
          setPrice('');
          setImage(null);
          setCategory('');
          if (fileInputRef.current) fileInputRef.current.value = null;
      }
    } catch (error) {
      toast.error(error.message || "Network Error");
    }
  }

  return (
    <>
    <div className='w-full max-w-md'>
      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* image */}
        <div className="flex flex-col">
          <label htmlFor="Image" className='pb-2'>Product image</label>
          <div className="p-4 shadow-md rounded-md cursor-pointer
           w-52 hover:shadow-lg transition duration-300" onClick={handleUploadClick}>
            <UploadCloud size={20} />
            <p>{image instanceof File ? image.name : "Upload"}</p>
            <input type="file" name="image"
             id="image" ref={fileInputRef}
             onChange={handleFileChange}
              className='hidden' />
          </div>
        </div>
        <div className="flex flex-col">
          <label className='pb-2'>Product Title</label>
          <input type="text" placeholder='Title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className='outline-none border p-2 bg-transparent w-full'
           required />
        </div>
        {/* description */}
        <div className="flex flex-col">
          <label className='pb-2'>Product Description</label>
          <textarea type="text" placeholder='Title'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className='outline-none border p-2 bg-transparent w-full'
           required />
        </div>
        {/* description */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col w-full md:w-32">
            <label htmlFor="Category" className='pb-2'>Product category</label>
            <select name="category" 
            id="category" value={category}
            onChange={(e)=>setCategory(e.target.value)}
             className='border p-2'>
            <option value="">Select option</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="PureVeg">PureVeg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
          </div>
          <div className="flex flex-col w-full md:w-32">
            <label htmlFor="Price" className='pb-2'>Product price</label>
            <input type="number" 
            placeholder='Price'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
             className='outline-none border p-2 bg-transparent w-full' />
          </div>
        </div>
        <button type='submit' className='bg-gray-900 text-white px-5 py-2 cursor-pointer
         shadow-md hover:bg-gray-700 transition duration-300 w-full md:w-32 '>UPDATE</button>
      </form>
    </div>
    </>
  )
}

export default Update