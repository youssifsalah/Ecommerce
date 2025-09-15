import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import Footer from "../Footer/Footer"
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="container flex-grow sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto my-5 mt-18">
        <Outlet /> {/* Pages go here */}
      </div>

      {/* Footer (sticks to bottom if page is short) */}
      <Footer />
    </div>
  )
}
