import { useState } from "react"
import { Navbar } from "../Navbar/Navbar"
import Style from "./Home.module.css"
import {DisplayProducts} from '../DisplayProducts/DisplayProducts'
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider"
import AllOrders from '../AllOrders/AllOrders'
export  function Home() {

   

  return <>
  <CategoriesSlider/>
<h1>Welcome to YS Mart ! </h1>
<p className="mb-5">Explore All Products Now </p>

<DisplayProducts/>


</>
}


