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


<nav className="bg-gray-200 fixed w-full top-0 z-50 shadow px-10">
  <div className="container mx-auto flex items-center justify-between p-1">
    {/* Logo + Button */}
    <div className="flex items-center gap-6">
      <Link to="/">
        <div className='d-flex flex'><img src={logo} alt="logo" className="h-11"  /><span className={Style["logo-name"]} > YS Mart</span></div>
      </Link>

      <button
        className="lg:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
    </div>

    {/* Menu Links */}
    <div
      className={`flex-col lg:flex-row lg:flex items-center w-full lg:w-auto gap-4 mt-4 lg:mt-0 ${
        open ? "flex" : "hidden"
      }`}
    >
      {token ? (
        <ul className="flex flex-col lg:flex-row gap-4 items-center pe-30 2xl:pe-75 text-gray-800 font-serif text-l  ">
          <li className=' hover:text-black'><Link to="/">Home</Link></li>
          <li className=' hover:text-black'><Link to="/products">Products</Link></li>
          
          <li className=' hover:text-black'><Link to="/brands">Brands</Link></li>
          <li className=' hover:text-black'><Link to="/categories">Categories</Link></li>

          <li className=' hover:text-black'><Link to="/Allorders">My Orders</Link></li>
        </ul>
      ) : null}

      {/* Social + Auth Links */}
      <ul className="flex flex-col lg:flex-row items-center gap-4 lg:ms-auto mt-4 lg:mt-0">
        
        {token ? (
            <>
            
            <li className='hover:text-black text-xl mx-5'><Link to="/wishlist"><i class="fa-solid fa-heart"></i></Link></li>
            <li className='hover:text-black text-xl'><Link to="/cart"><i class="fa-solid fa-bag-shopping"></i></Link></li>
           <li>
  <button
    onClick={logout}
    className="bg-black text-white font-serif ms-10 px-3 py-2 rounded-3xl hover:bg-gray-800 transition-colors "
  >
    Logout
  </button>
</li>

            
            </>
        ) : (
          <>
            <li ><Link to="/login">Login</Link></li>
            <li ><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </div>
  </div>
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












