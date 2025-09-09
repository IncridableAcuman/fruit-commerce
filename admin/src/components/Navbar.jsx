import { LogOut, UserRound } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-10 border-b bg-white'>
        <h1 className='text-2xl lg:text-3xl text-green-600'>Logo</h1>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-green-600 cursor-pointer">
            <UserRound/>
            <LogOut/>
        </div>
    </div>
  )
}

export default Navbar