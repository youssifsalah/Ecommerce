import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Style from "./Navbar.module.css"
import logo from "../../assets/logo.svg"
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
 <nav className="bg-gray-200 fixed w-full top-0 z-50 shadow px-25">
      <div className="container mx-auto flex items-center justify-between p-4">

<div className="div flex items-center gap-6">
  <Link to="/">
    <img src={logo} alt="logo" className="h-8" />
  </Link>

  <button
    className="lg:hidden text-2xl"
    onClick={() => setOpen(!open)}
  >
    ☰
  </button>

  {token ? (
    <ul className="flex flex-col lg:flex-row gap-4 lg:ms-4 items-center justify-center ps-55">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/products">Products</Link></li>
      <li><Link to="/wishlist">WishList</Link></li>
      <li><Link to="/brands">Brands</Link></li>
      <li><Link to="/categories">Categories</Link></li>
      <li><Link to="/cart">Cart</Link></li>
    </ul>
  ) : null}
</div>


        {/* Menu Links */}
        <div className={`flex-col lg:flex-row lg:flex items-center w-full lg:w-auto gap-4 mt-4 lg:mt-0 ${open ? 'flex' : 'hidden'}`}>

          {/* Social + Auth Links */}
          <ul className="flex flex-col lg:flex-row items-center gap-4 lg:ms-auto">
            <li><i className="fab fa-facebook"></i></li>
            <li><i className="fab fa-twitter"></i></li>
            <li><i className="fab fa-instagram"></i></li>
            {token?<li><span onClick={logout} className="cursor-pointer">Logout</span></li>: <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li> </> }
          </ul>
        </div>
      </div>
    </nav>

  
  </>


}












