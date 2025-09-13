import { X } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { UseCart } from "../contexts/CartProvider"

const Cart = () => {
  const {cart} = UseCart();
  
  return (
    <>
    <Navbar/>
    <div className="w-full min-h-screen mx-auto pt-40 padd">
      <div className="overflow-x-auto pt-24 scrolly">
          <table className="w-full max-w-6xl mx-auto ">
              <thead>
                <tr className="text-sm text-gray-400 border-b border-b-gray-400">
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Remove</th>
                </tr>
              </thead>
              <tbody >
                {
                  cart?.itemData.map((item)=>(
                    <tr className="border-b border-b-gray-400">
                        <td className="px-4 py-3">
                          <img src={`http://localhost:8080${item?.productImage}`} alt="food" className="w-12 h-12 object-cover rounded-md" />
                        </td>
                        <td className="px-4 py-3 text-sm">{item?.productTitle}</td>
                        <td className="px-4 py-3">{item?.productPrice}$</td>
                        <td className="px-4 py-3"><input type="number" className="w-12 border outline-none text-center" value={item?.quantity} min="1" /></td>
                        <td className="px-4 py-3">{item?.productPrice*item?.quantity}$</td>
                        <td className="px-4 py-3 cursor-pointer text-gray-400 hover:text-gray-700 transition duration-300"><X size={20} /></td>
                      </tr>
                  ))
                }
              </tbody>
      </table>
      </div>
    </div>
    <Footer/>
    
    </>
  )
}

export default Cart