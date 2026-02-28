import React, { useEffect } from 'react'
import { Navbar } from '../Navbar/Navbar'
import Footer from "../Footer/Footer"
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto flex-grow px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-6">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
