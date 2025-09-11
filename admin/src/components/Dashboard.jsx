import { UploadCloud } from 'lucide-react'
import React, { useRef } from 'react'

const Dashboard = () => {
    const fileInputRef=useRef(null);

  const handleUploadClick=()=>{
    fileInputRef.current?.click();
  }
  return (
    <div className='w-full max-w-md'>
      <form className='space-y-4'>
        {/* image */}
        <div className="flex flex-col">
          <label htmlFor="Image" className='pb-2'>Product image</label>
          <div className="p-4 shadow-md rounded-md cursor-pointer
           w-52 hover:shadow-lg transition duration-300" onClick={handleUploadClick}>
            <UploadCloud size={20} />
            <input type="file" name="image" id="image" ref={fileInputRef} className='hidden' />
            <p>Upload an image</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label className='pb-2'>Product Title</label>
          <input type="text" placeholder='Title'
          className='outline-none border p-2 bg-transparent w-full'
           required />
        </div>
        {/* description */}
        <div className="flex flex-col">
          <label className='pb-2'>Product Description</label>
          <textarea type="text" placeholder='Title'
          className='outline-none border p-2 bg-transparent w-full'
           required />
        </div>
        {/* description */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col w-full md:w-32">
            <label htmlFor="Category" className='pb-2'>Product category</label>
            <select name="category" id="category" className='border p-2'>
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
            <input type="number" placeholder='Price' className='outline-none border p-2 bg-transparent w-full' />
          </div>
        </div>
        <button className='bg-gray-900 text-white px-5 py-2 cursor-pointer
         shadow-md hover:bg-gray-700 transition duration-300 w-full md:w-32 '>ADD</button>
      </form>
    </div>
  )
}

export default Dashboard