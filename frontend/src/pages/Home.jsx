import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Star,CirclePlus,CircleMinus   } from "lucide-react";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [counts,setCounts]=useState({});
  const [selectedMenu,setSelectedMenu]=useState(null);
  const menuImages = [
    { id:1, name: "Salad", image: "/menu_1.png" },
    { id:2, name: "Rolls", image: "/menu_2.png" },
    { id:3, name: "Deserts", image: "/menu_3.png" },
    { id:4, name: "Sandwich", image: "/menu_4.png" },
    { id:5, name: "Cake", image: "/menu_5.png" },
    { id:6, name: "Pure Veg", image: "/menu_6.png" },
    { id:7, name: "Pasta", image: "/menu_7.png" },
    { id:8, name: "Noodles", image: "/menu_8.png" },
    
  ];

  const handleIncrease = (id)=>{
    setCounts((prev)=>({...prev,[id]:(prev[id] || 0)+1}));
  }

  const handleDescrease = (id)=>{
    setCounts((prev)=>({...prev,[id]:Math.max((prev[id] || 0)-1,0)}));
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
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

      <div className="w-full max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl font-semibold pb-2">Explore Our Menu</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <div className="flex items-center justify-between gap-6 mt-6 overflow-x-auto scrolly">
          {menuImages.map((item, index) => (
            <div key={index} 
            className="flex flex-col items-center flex-shrink-0"
            onClick={()=>setSelectedMenu(selectedMenu===index ? null : index)}
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
      </div>
      {/* card */}
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold py-5">Top dishes near you</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-white shadow-md rounded transition-transform duration-500 ease-in-out hover:scale-110">
            <div className="relative">
            <img src="./food_1.png" alt="food" 
            className="rounded-t-2xl w-full" />
              <div className="absolute top-40 right-3 flex items-center gap-3 bg-white py-2 px-3 rounded-full shadow-md text-green-600">
                <button className="cursor-pointer text-green-800">
                  <CircleMinus size={18} onClick={()=>handleDescrease()} />
                </button>
                  <p>{counts[0] || 0}</p>
                <button className="cursor-pointer">
                  <CirclePlus size={18} onClick={()=>handleIncrease()} />
                </button>      
              </div>
            </div>
            {/* content */}
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold">Greek salad</h2>
              <div className="flex items-center gap-2">
                <Star size={15} className="text-yellow-300" />
                <Star size={15} className="text-yellow-300" />
                <Star size={15} className="text-yellow-300" />
                <Star size={15} className="text-yellow-300" />
                <Star size={15} className="text-gray-500"  />
              </div>
            </div>
            {/* content */}
          <p className="text-sm p-4 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, laudantium.</p>
          <h1 className="text-2xl text-green-600 px-3 pb-3">12$</h1>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="text-center py-5">
        <h1 className="text-3xl lg:text-5xl font-bold">For Better Expirence Download <br /> Commerce App</h1>
        <div className="flex items-center justify-center gap-3 py-5">
          <img src="./app_store.png" alt="app store" />
          <img src="play_store.png" alt="play store" />
        </div>
      </div>
      {/* footer */}
      <Footer/>
    </>
  );
};

export default Home;
