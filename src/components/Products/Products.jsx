import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Style from "./Products.module.css"
import { DisplayProducts } from '../DisplayProducts/DisplayProducts'
export  function Products(props) {


return<>
<h1 className='mb-0'>Products </h1>
<p className='mb-10'>Discover Our New Products </p>
<DisplayProducts/>
</>
}

