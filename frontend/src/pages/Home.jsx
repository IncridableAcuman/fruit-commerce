import { useEffect,useState } from "react";
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CirclePlus,CircleMinus, StarHalf   } from "lucide-react";
import Footer from "../components/Footer";
import MenuData from "../components/MenuData";
import { UseProduct } from "../contexts/ProductProvider";
import { UseCart } from "../contexts/CartProvider";
import Menu from "../components/Menu";

const Home = () => {
  const navigate = useNavigate();
  const [counts,setCounts]=useState({});
  const {products}=UseProduct();
  const {addToCart}=UseCart();

  const handleIncrease = (id)=>{setCounts((prev)=>({...prev,[id]:(prev[id] || 0)+1}));}
  const handleDescrease = (id)=>{setCounts((prev)=>({...prev,[id]:Math.max((prev[id] || 0)-1,0)}));}

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Menu/>
      <div className="w-full max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl font-semibold pb-2">Explore Our Menu</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
          {/* menu */}
        <MenuData/>
        {/* menu */}
      </div>
      {/* card */}
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold py-5">Top dishes near you</h1>
        <motion.section transition={{duration:0.5}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            products.map((item)=>(
              <div key={item?.id} className="bg-white shadow-md rounded  hover:shadow-lg transition duration-300 p-4">
              <div className="relative">
              <img src={`http://localhost:8080${item?.image}`} alt={item?.title} 
              className="rounded-t-2xl w-full" />
                <div className="absolute top-40 right-3 flex items-center gap-3 bg-white py-2 px-3 rounded-full shadow-md text-green-600">
                  <button className="cursor-pointer text-green-800">
                    <CircleMinus size={18} onClick={()=>handleDescrease(item?.id)} />
                  </button>
                    <p>{counts[item?.id] || 0}</p>
                  <button className="cursor-pointer">
                    <CirclePlus size={18} onClick={()=>handleIncrease(item?.id)} />
                  </button>      
                </div>
              </div>
              {/* content */}
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-semibold">{item?.title}</h2>
                <h1 className="text-2xl text-green-600 px-3 pb-3">{item?.price}$</h1>
              </div>
              {/* content */}
            <p className="text-sm p-4 text-gray-500">{item?.description.slice(0,40)}...</p>
            <button className="text-sm bg-green-600 text-white w-full p-2 rounded-md shadow-md cursor-pointer
             hover:bg-green-400 transition duration-300" onClick={()=>addToCart(item?.id,counts[item?.id] || 1)}>Add To Cart</button>
            </div>
            ))
          }
          </div>
        </motion.section>
      </div>
      {/*  */}
      <div className="text-center py-5">
        <h1 className="text-3xl lg:text-5xl font-bold">For Better Expirence Download <br /> Commerce App</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-5">
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
