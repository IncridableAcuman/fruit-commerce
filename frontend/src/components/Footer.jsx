import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left - Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-red-500">Logo.</h2>
          <p className="text-sm mt-3 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <Facebook />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <Twitter />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Middle - Company Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500">Home</a></li>
            <li><a href="#" className="hover:text-red-500">About us</a></li>
            <li><a href="#" className="hover:text-red-500">Delivery</a></li>
            <li><a href="#" className="hover:text-red-500">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right - Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">GET IN TOUCH</h3>
          <p className="text-sm">+99899 566 90 11</p>
          <p className="text-sm">abdusharipovizzat03@gmail.com</p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        Izzatbek Abdusharipov - All Rights Reserved.
      </div>
    </footer>
    </>
  )
}

export default Footer