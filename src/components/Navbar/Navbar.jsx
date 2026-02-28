import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Style from "./Navbar.module.css"
import logo from "../../assets/YS.png"
import { authContext } from "../../Context/AuthContextProvider"

export function Navbar() {
  const { token, setToken } = useContext(authContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function logout() {
    setToken(null)
    localStorage.removeItem("token")
    navigate("/Login")
  }

  return (
    <>
      <nav className="bg-gray-200 fixed w-full top-0 z-50 shadow px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-2 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl leading-none"
              aria-label="Toggle menu"
            >
              &#9776;
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-10 w-10 object-contain" />
              <span className="font-bold text-lg">YS Mart</span>
            </Link>
          </div>

          {token && (
            <ul className="hidden md:flex flex-wrap gap-4 lg:gap-6 items-center">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/brands">Brands</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/Allorders">My Orders</Link></li>
            </ul>
          )}

          {token && (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link to="/wishlist" className="text-xl hover:text-red-600">
                <i className="fa-solid fa-heart"></i>
              </Link>
              <Link to="/cart" className="text-xl hover:text-gray-800">
                <i className="fa-solid fa-bag-shopping"></i>
              </Link>
              <button
                onClick={logout}
                className="hidden md:inline-flex bg-black text-white px-3 py-1 rounded-2xl hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {open && token && (
          <div className="md:hidden bg-gray-100 w-full shadow-lg">
            <ul className="flex flex-col gap-2 p-4">
              <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
              <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
              <li><Link to="/brands" onClick={() => setOpen(false)}>Brands</Link></li>
              <li><Link to="/categories" onClick={() => setOpen(false)}>Categories</Link></li>
              <li><Link to="/Allorders" onClick={() => setOpen(false)}>My Orders</Link></li>
              <li>
                <button
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="bg-black text-white px-3 py-1 rounded-2xl w-full hover:bg-gray-800"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <nav className="w-full bg-black overflow-hidden mt-16">
        <div className={Style["ticker-container"]}>
          <div className={Style["ticker-move"]}>
            <span className={Style["ticker-text"]}>
              Black Friday Sale! Get up to 50% OFF on all products - Limited Time Only!
              <a href="#">Shop Now</a>
            </span>

            <span className={Style["ticker-text"]}>
              Black Friday Sale! Get up to 50% OFF on all products - Limited Time Only!
              <a href="#">Shop Now</a>
            </span>

            <span className={Style["ticker-text"]}>
              Black Friday Sale! Get up to 50% OFF on all products - Limited Time Only!
              <a href="#">Shop Now</a>
            </span>

            <span className={Style["ticker-text"]}>
              Black Friday Sale! Get up to 50% OFF on all products - Limited Time Only!
              <a href="#">Shop Now</a>
            </span>

            <span className={Style["ticker-text"]}>
              Black Friday Sale! Get up to 50% OFF on all products - Limited Time Only!
              <a href="#">Shop Now</a>
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}
