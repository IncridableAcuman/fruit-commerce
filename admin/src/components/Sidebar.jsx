import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

const Sidebar = () => {
    const [state,setState]=useState(false);
    const menuItems=[
        {icon:<PlusCircle size={18} />,title:"Add Items"}
    ]
  return (
    <>
    <div className="w-32 md:w-64 min-h-screen bg-white border-r">
        <div className="pt-10 ml-3">
            {
                menuItems.map((item,index)=>(
                    <div className={`flex items-center gap-3 text-sm md:text-lg p-2 border-y border-l
                     cursor-pointer ${state ? "bg-green-500 text-white transition duration-300": "bg-white transition duration-300"}`} key={index} onClick={()=>setState(!state)}>
                        {item.icon}
                        {item.title}
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Sidebar