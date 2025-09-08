import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const menuImages = [
    { name: "Salad", image: "/menu_1.png" },
    { name: "Rolls", image: "/menu_2.png" },
    { name: "Deserts", image: "/menu_3.png" },
    { name: "Sandwich", image: "/menu_4.png" },
    { name: "Cake", image: "/menu_5.png" },
    { name: "Pure Veg", image: "/menu_6.png" },
    { name: "Pasta", image: "/menu_7.png" },
    { name: "Noodles", image: "/menu_8.png" },
  ];

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
          <h2 className="text-3xl lg:text-5xl font-semibold">Order your</h2>
          <h2 className="text-3xl lg:text-5xl font-semibold pb-3">
            favourite food here
          </h2>
          <p className="max-w-md pb-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
            aperiam corrupti dolores temporibus sunt soluta numquam.
          </p>
          <button className="bg-white text-black px-5 py-2.5 rounded-full shadow cursor-pointer hover:bg-gray-50 transition duration-300">
            View Menu
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10">
        <h1 className="text-2xl font-semibold pb-2">Explore Our Menu</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <div className="flex items-center justify-between gap-6 mt-6">
          {menuImages.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />
              <p className="mt-2 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
