import { Search, ShoppingBasket, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-30 py-4 gap-2 bg-white z-50'>
      <div className="text-2xl font-semibold text-green-600">Logo</div>
      <div className="flex items-center gap-3">
        <Link>Home</Link>
        <Link>Menu</Link>
        <Link>Contact Us</Link>
      </div>
      <div className="flex items-center gap-3 lg:gap-5">
        <Search/>
        <ShoppingBasket/>
        <UserRound/>
      </div>
    </div>
  )
}

export default Navbar