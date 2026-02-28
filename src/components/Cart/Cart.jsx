import React , {useContext, useEffect , useState} from 'react'
import Style from "./Cart.module.css"
import { cartContext } from '../../Context/CartContextProvider'
import { ColorRing } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function Cart() {
  

 let {getCart , isLoading , cartId , setCartId ,   deleteCart , updateQuantity ,  products , numOfCart , totalPrice , removeItem} = useContext(cartContext)
 useEffect(()=>{
 getCart()
 },[])
 
async function removeItemFromCart(id) {
  let success = await removeItem(id)
  if (success) {
    toast.success("Item removed from cart ✅")
  } else {
    toast.error("Failed to remove item ❌")
  }
}

async function updateProduct(id,count) {
  let success = await updateQuantity(id,count)
  if (success) {
    toast.success("Updated ✅")
  } else {
    toast.error("Failed to Update ❌")
  }
}


 if(isLoading){
  return     <div className='flex justify-center'>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64']}
          />
        </div>
 }
  return <>

<div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
  <div className='text-center sm:text-left'>
    <h2 className='font-mono text-xl sm:text-2xl'>Total price : {totalPrice} EGP</h2>
    <h2 className='font-mono text-xl sm:text-2xl'>Number Of Items : {numOfCart}</h2>
  </div>
  <button onClick={()=>{deleteCart()}} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center w-full sm:w-auto">Clear Cart</button>
</div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full min-w-[640px] text-sm text-left rtl:text-right text-black">
    <thead className="text-xs text-black uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
{      products.map((product)=> <tr key={product.product._id} className="bg-white border-b border-gray-200 hover:bg-gray-200 text-black">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-black">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(product.product._id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-black bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 " placeholder={product.count} required />
            </div>
            <button  onClick={()=>updateProduct(product.product._id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900">
      {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <span
  onClick={() => removeItemFromCart(product.product._id)}
  className="cursor-pointer font-medium text-red-600 hover:underline"
>
  Remove
</span>

        </td>
      </tr>)}


     

    </tbody>
  </table>

</div>
 <div className='mt-8'><Link to={"/payment"} type="button" className="inline-block text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">Checkout</Link></div>




  
  
  </>
 

}
