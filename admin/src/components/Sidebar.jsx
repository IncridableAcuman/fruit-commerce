import { List, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import {Link} from 'react-router-dom';

const Sidebar = () => {
    const [state,setState]=useState(false);
  return (
    <>
    <div className="w-32 md:w-64 min-h-screen bg-white border-r">
        <div className="pt-24 ml-3">
            <div className="space-y-4">
                <Link to={"add"} className={`flex items-center gap-3 border-y border-l p-2 hover:bg-gray-50 transition duration-300`}
                      onClick={()=>setState(!state)}>
                <PlusCircle size={20} />
                <p>Add Item</p>
                </Link>
                <Link to={"/"} className={`flex items-center gap-3 border-y border-l p-2 hover:bg-gray-50 transition duration-300`}>
                    <List size={20} />
                    <p>List items</p>
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar