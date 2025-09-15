
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider"; 

export default function Footer() {
  
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10 bottom-0 left-0 ">
      <div className="container  mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Fresh Mart</h2>
          <p className="text-sm leading-6">
            Your trusted online store for fresh products, daily essentials, and more. 
            We deliver quality at the best prices, straight to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-400">Products</Link></li>
            <li><Link to="/wishlist" className="hover:text-green-400">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-green-400">Cart</Link></li>
            <li><Link to="/categories" className="hover:text-green-400">Categories</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-green-400">FAQ</a></li>
            <li><a href="#" className="hover:text-green-400">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-lg w-full text-black"
            />
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white">
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-green-400"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-green-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-green-400"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-green-400"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Fresh Mart. All rights reserved.
      </div>
    </footer>
  );
}
