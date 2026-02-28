import React, { createContext, useContext, useState } from 'react'
import { authContext } from './AuthContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


export let WishlistContext = createContext()
export default function WishlistContextProvider({children}) {

  const [products, setProducts] = useState([])
  const [numOfWishlist, setNumOfWishlist] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  let {token} = useContext(authContext)

  async function getWishlist(){
    setIsLoading(true)
   let res =  await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {
    headers:{
        token
    }
  })
  .then((res)=>{
   console.log(res);
  setProducts(res.data.data)
  setNumOfWishlist(res.data.count)
  setIsLoading(false)
   
  })
   }

   async function addToWishlist(productId) {
    try {
      let res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      )
      // refresh cart
      await getWishlist()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function removeWishlist(productId) {
  try {
    let res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: { token } }
    )
    // ✅ refresh wishlist after removing
    await getWishlist()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

function isInWishlist(productId) {
  return products?.some((item) => item._id === productId)
}

async function toggleWishlist(productId) {
  if (isInWishlist(productId)) {
    return removeWishlist(productId)
  }
  return addToWishlist(productId)
}


return (
    <WishlistContext.Provider value={{getWishlist ,addToWishlist , removeWishlist ,toggleWishlist, isInWishlist, isLoading , totalPrice , products ,  numOfWishlist }}>
      
      {children}

    </WishlistContext.Provider>
  )


}
