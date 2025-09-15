import React from 'react'

const Menu = () => {
  return (
    <>
         <div className="w-full max-w-6xl mx-auto pt-24 text-white relative">
                <img src="/header_img.png" alt="header image" className="w-full" />
                <div className="absolute top-1/3 left-10">
                <h2 className="text-2xl lg:text-5xl font-semibold">Order your</h2>
                <h2 className="text-2xl lg:text-5xl font-semibold pb-3">
                    favourite food here
                </h2>
                <p className="max-w-md pb-2 md:pb-5 text-xs md:text-sm">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
                    aperiam corrupti dolores temporibus sunt soluta numquam.
                </p>
                <button className="bg-white text-black px-5 py-1.5 md:py-2.5 rounded-full shadow cursor-pointer hover:bg-gray-50 transition duration-300">
                    View Menu
                </button>
                </div>
      </div>
    </>
  )
}

export default Menu