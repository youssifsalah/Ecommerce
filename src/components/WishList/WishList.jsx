import React , {useContext, useEffect , useState} from 'react'
import Style from "./WishList.module.css"
import { WishlistContext } from '../../Context/WishlistContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContextProvider'
import { Link } from 'react-router-dom'
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
      
        <h1>Wishlist </h1>
     <div className='text-center'>
   
      <h1 className='text-4xl font-serif mb-10 '>Number Of Items : {numOfWishlist}</h1> 
</div>


                <div className='parent grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 '>
                  {products?.map((product) => (
                    <div className='group overflow-hidden relative cursor-pointer shadow-2xl p-2 px-3 rounded-3xl' key={product._id}>
                      <Link to={`/ProductDetails/${product._id}/${product.category}`}>
                        <img src={product.imageCover} alt={product.title}/>
                        
                        <h2 className='text-mono text-black font-bold'>{product.title.split(" ", 2).join(" ")}</h2>
              <p>
          {product.description.length > 50
            ? product.description.slice(0, 50) + "..."
            : product.description}
        </p>
        
                        <div className='flex justify-between'>
                          {product.priceAfterDiscount ? (
                            <>
                              <h3 className='text-red-500 line-through'>{product.price} EGP</h3>
                              <h3>{product.priceAfterDiscount} EGP</h3>
                            </>
                          ) : (
                            <h3>{product.price} EGP</h3>
                          )}
                          <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
                        </div>
                        {product.priceAfterDiscount ? (
                          <span className="mb-10 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-700 dark:text-white">
                            Sale
                          </span>
                        ) : null}
                      </Link>
        <div >         
        
          <button type="button"   onClick={()=>{addToCartProduct(product._id)}}
         class="inline-flex items-center btn me-10 bg-black rounded-3xl text-white bg-brand hover:bg-gray-800 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
        <svg class="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
        </svg>
        Add To Cart
        </button>
                        <button 
                        onClick={()=>{RemoveToWishlistProduct(product._id)}}
                      type="button"
                        className="cursor-pointer 
                        text-red-600
                        hover:text-black text-3xl"
                      ><i class="fa-solid fa-heart"></i></button>
        
                    
        </div>
                    </div>
                  ))}
                </div> 


  </>
 

}
