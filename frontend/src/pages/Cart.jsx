import { X } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Cart = () => {
  return (
    <>
    <Navbar/>
    <div className="w-full min-h-screen mx-auto pt-40 padd">
      <div className="overflow-x-auto pt-24">
          <table className="w-full max-w-6xl mx-auto border-b border-b-gray-400">
              <thead>
                <tr className="text-sm text-gray-400">
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3">
                    <img src="./food_1.png" alt="food" className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="px-4 py-3 font-medium">Greek Salad</td>
                  <td className="px-4 py-3">12$</td>
                  <td className="px-4 py-3"><input type="number" className="w-12 border outline-none" defaultValue={2} min="1" /></td>
                  <td className="px-4 py-3">24$</td>
                  <td className="px-4 py-3"><X size={20} /></td>
                </tr>
              </tbody>
      </table>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Cart