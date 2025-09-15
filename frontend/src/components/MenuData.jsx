import { useState } from "react";
import { UseProduct } from "../contexts/ProductProvider";

const MenuData = () => {
    const [selectedMenu,setSelectedMenu]=useState(null);
    const {getAllProductsByCategory,getProducts} = UseProduct();
      const menuImages = [
    { id:1, name: "Salad", image: "/menu_1.png" },
    { id:2, name: "Rolls", image: "/menu_2.png" },
    { id:3, name: "Deserts", image: "/menu_3.png" },
    { id:4, name: "Sandwich", image: "/menu_4.png" },
    { id:5, name: "Cake", image: "/menu_5.png" },
    { id:6, name: "PureVeg", image: "/menu_6.png" },
    { id:7, name: "Pasta", image: "/menu_7.png" },
    { id:8, name: "Noodles", image: "/menu_8.png" },
    
  ];

  const handleMenuCLick=(index,name)=>{
    if(selectedMenu===index){
      setSelectedMenu(null);
      getProducts();
    } else{
      setSelectedMenu(index);
      getAllProductsByCategory(name);
    }
  }

  return (
    <>
            <div className="flex items-center justify-between gap-6 mt-6 overflow-x-auto scrolly">
          {menuImages.map((item, index) => (
            <div key={index} 
            className="flex flex-col items-center flex-shrink-0"
            onClick={()=>handleMenuCLick(index,item?.name)}
            >
              <img
                src={item.image}
                alt={item.name}
                className={`w-24 h-24 object-contain ${selectedMenu===index ? " border-4 border-green-700 rounded-full transition duration-300":"border-none transition duration-300"}`}
              />
              <p className="mt-2 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
    </>
  )
}

export default MenuData