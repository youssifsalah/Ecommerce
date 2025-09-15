import React , {useContext, useEffect , useState} from 'react'
import Style from "./WishList.module.css"
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContextProvider'
export default function WishList() {
  let {addToCart} = useContext(cartContext)
  

 let {getWishlist ,addToWishlist , removeWishlist  , isLoading ,  totalPrice , products , numOfWishlist} = useContext(WishlistContext)
 useEffect(()=>{
 getWishlist()
 },[])
 
  async function RemoveToWishlistProduct(id) {
    let flag = await removeWishlist(id)
     if (flag) {
       toast.success("Item Added successfully ✅")
     } else {
       toast.error("Failed to add ❌")
     }
   }
      async function addToCartProduct(id) {
    let flag = await addToCart(id)
     if (flag) {
       toast.success("Item Added successfully ✅")
     } else {
       toast.error("Failed to add ❌")
     }
   }


   <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toasterId="default"
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
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
      

     <div className='text-center'>
   
      <h1 className='text-4xl font-serif mb-10 mt-25'>Number: {numOfWishlist}</h1> 
</div>


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-black">
    <thead className="text-xs text-black uppercase bg-gray-50">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
                <th scope="col" className="px-6 py-3">
          Category
        </th>
                <th scope="col" className="px-6 py-3">
          Brand
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
                <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
{      products.map((product)=> <tr key={product._id} className="bg-white border-b border-gray-200 hover:bg-gray-200 text-black">
        <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-black">
          {product.title}
        </td>
          <td className="px-6 py-4 font-semibold text-black">
         {product.category?.name}
        </td>
          <td className="px-6 py-4 font-semibold text-black">
         {product.brand?.name}
        </td>
      
        <td className="px-6 py-4 font-semibold text-gray-900">
      {product.price} EGP
        </td>
        <td className="px-6 py-4">
           <button
                onClick={()=>{addToCartProduct(product._id)}}
                type="button"
                className=" transition-all duration-500 text-white 
                bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br 
                focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 
                shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add To Cart
              </button> 

        </td>
                <td className="px-6 py-4">
   <button 
              onClick={()=>{RemoveToWishlistProduct(product._id)}}
              type="button"
                className="cursor-pointer transition-all  duration-500
                text-red-700
                hover:text-gray-900 text-4xl"
              ><i class="fa-solid fa-heart"></i></button>
        </td>
      </tr>)}


     

    </tbody>
  </table>

</div>


  
  
  </>
 

}
