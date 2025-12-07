import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Style from "./Navbar.module.css"
import logo from "../../assets/YS.png"
import { useState } from "react";
import { authContext } from '../../Context/AuthContextProvider';

export function Navbar() {
  let {token , setToken} =useContext(authContext)
  console.log(token);
 let navigate =  useNavigate()
  function logout (){

setToken(null)
localStorage.removeItem("token")
navigate("/Login")
  }
  
  const [open, setOpen] = useState(false);
  return <>


<nav className="bg-gray-200 fixed w-full top-0 z-50 shadow px-4">
      <div className="container mx-auto flex items-center justify-between p-2">
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger only <425px */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-2xl"
          >
            ☰
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 " />
            <span className="font-bold text-lg ">YS Mart</span>
          </Link>
        </div>

        {/* Center: Links (tablet & desktop) */}
        {token && (
          <ul className="hidden sm:flex flex-col sm:flex-row gap-6 items-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/Allorders">My Orders</Link></li>
            {/* Logout only in tablet/desktop */}
            
          </ul>
        )}

        {/* Right: Wishlist & Cart always visible */}
        {token && (
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="text-xl hover:text-red-600">
              <i className="fa-solid fa-heart"></i>
            </Link>
            <Link to="/cart" className="text-xl hover:text-gray-800">
              <i className="fa-solid fa-bag-shopping"></i>
            </Link>

            <li>
              <button 
                onClick={logout}
                className="bg-black text-white px-3 py-1 rounded-2xl hover:bg-gray-800 transition-colors hidden sm:flex flex-col sm:flex-row gap-6 items-center"
              >
                Logout
              </button>
            </li>
          </div>
        )}
      </div>

      {/* Mobile Menu: <425px */}
      {open && (
        <div className="sm:hidden bg-gray-100 w-full shadow-lg absolute top-full left-0">
          <ul className="flex flex-col gap-2 p-4">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
            <li><Link to="/brands" onClick={() => setOpen(false)}>Brands</Link></li>
            <li><Link to="/categories" onClick={() => setOpen(false)}>Categories</Link></li>
            <li><Link to="/Allorders" onClick={() => setOpen(false)}>My Orders</Link></li>
            <li>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="bg-black text-white px-3 py-1 rounded-2xl w-full hover:bg-gray-800"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
<nav className="navbar p-0 mt-12">
  <div className={Style["ticker-container"]}>
    <div className={Style["ticker-move"]}>

      <span className={Style["ticker-text"]}>
        Black Friday Sale! Get up to 50% OFF on all products — Limited Time Only!
        <a href="#">Shop Now</a>
      </span>

      <span className={Style["ticker-text"]}>
        Black Friday Sale! Get up to 50% OFF on all products — Limited Time Only!
        <a href="#">Shop Now</a>
      </span>

      <span className={Style["ticker-text"]}>
        Black Friday Sale! Get up to 50% OFF on all products — Limited Time Only!
        <a href="#">Shop Now</a>
      </span>

      <span className={Style["ticker-text"]}>
        Black Friday Sale! Get up to 50% OFF on all products — Limited Time Only!
        <a href="#">Shop Now</a>
      </span>

      <span className={Style["ticker-text"]}>
        Black Friday Sale! Get up to 50% OFF on all products — Limited Time Only!
        <a href="#">Shop Now</a>
      </span>

    </div>
  </div>
</nav>


  
  </>


}












