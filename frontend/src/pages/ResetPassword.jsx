import { Lock, Send } from 'lucide-react';
import React from 'react';

const ResetPassword = () => {
  return (
    <>
    <div className="w-full h-screen bg-image">
      <div className="bg-gray-900 text-white w-full h-screen opacity-90">
        <div className="flex flex-col items-center justify-center h-screen">
          <form className='space-y-4 bg-black p-4 w-full max-w-md rounded-md shadow-md'>
            <h1 className='text-2xl lg:text-4xl pb-3 font-semibold text-center'>Reset Password</h1>
            <div  className="flex items-center gap-3 border p-3">
                            <Lock/>
                            <input type="password"
                             name="password"
                              id="password"
                               placeholder='Password'
                               className='outline-none w-full bg-transparent'
                               required
                                />
                        </div>
                        <div  className="flex items-center gap-3 border p-3">
                            <Lock/>
                            <input type="password"
                             name="password"
                              id="password"
                               placeholder='Confirm Password'
                               className='outline-none w-full bg-transparent'
                               required
                                />
                        </div>
                        <div  className="flex items-center justify-center gap-3 border p-3
                         cursor-pointer hover:bg-gray-50 transition duration-300 hover:text-gray-900">
                            <Send/>
                            <button>Update Password</button>
                        </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ResetPassword