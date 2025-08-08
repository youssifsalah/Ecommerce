// import React from 'react'

// export function Products() {
//   return <>
// <div className="container text-center">
//   <div className="row">
//     <div className="col border m-3 p-3 ">
//       <h1>iphone 15</h1>
//       <h2>price:20000</h2>
//       <h2>category:mobile</h2>
//       <button className='btn btn-danger w-100 my-2'>Delete</button>
//      <button className='btn btn-warning w-100 my-2'>update</button>

//     </div>
//        <div className="col border m-3 p-3 ">
//       <h1>iphone 15</h1>
//       <h2>price:20000</h2>
//       <h2>category:mobile</h2>
//       <button className='btn btn-danger w-100 my-2'>Delete</button>
//      <button className='btn btn-warning w-100 my-2'>update</button>

//     </div>
//        <div className="col border m-3 p-3 ">
//       <h1>iphone 15</h1>
//       <h2>price:20000</h2>
//       <h2>category:mobile</h2>
//       <button className='btn btn-danger w-100 my-2'>Delete</button>
//      <button className='btn btn-warning w-100 my-2'>update</button>

//     </div>
//   </div>
//   <div className="row">
//     <div className="col border m-3 p-3 ">
//       <h1>iphone 15</h1>
//       <h2>price:20000</h2>
//       <h2>category:mobile</h2>
//       <button className='btn btn-danger w-100 my-2'>Delete</button>
//      <button className='btn btn-warning w-100 my-2'>update</button>

//     </div>
//        <div className="col border m-3 p-3 ">
//       <h1>iphone 15</h1>
//       <h2>price:20000</h2>
//       <h2>category:mobile</h2>
//       <button className='btn btn-danger w-100 my-2'>Delete</button>
//      <button className='btn btn-warning w-100 my-2'>update</button>

//     </div>
//        <div className="col border m-3 p-3 ">
//       <h1>iphone 15</h1>
//       <h2>price:20000</h2>
//       <h2>category:mobile</h2>
//       <button className='btn btn-danger w-100 my-2'>Delete</button>
//      <button className='btn btn-warning w-100 my-2'>update</button>

//     </div>
//   </div>
// </div>

//   </>
// }

import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Style from "./Products.module.css"
export  function Products(props) {




const [products , setProducts] =useState([])
const [isloading , setisLoading] =useState(false)


 async function getProducts(){
    setisLoading(true)
let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
console.log(data);
setisLoading(false)
setProducts(data.data)

    }
    useEffect(()=>{
getProducts()
    },[])


  return <>
{isloading ? <i className='fas fa-spin fa-spinner text-center w-50'></i>:    <div className='row'>
        {products?.map((product)=><div className='col-md-4'>
        <div className="card">
            <img src={product.imageCover} alt='' />
            <div className="card-body">
                <h2 className={Style.test}>title {product.title}</h2>
                <h2>price: {product.price} $ </h2>
                <h2>{product.description}</h2>

            </div>
        </div>


</div> 
        )}
    </div>}

    </>

}

