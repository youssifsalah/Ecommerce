import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { authContext } from './AuthContextProvider';
import toast, { Toaster } from 'react-hot-toast';

export let cartContext = createContext()

export default function CartContextProvider({children}) {
  const [products, setProducts] = useState([])
  const [cartId, setCartId] = useState(null)
  const [numOfCart, setNumOfCart] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  let {token} = useContext(authContext)

  async function addToCart(productId) {
    try {
      let res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token } }
      )
      // refresh cart
      await getCart()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function getCart() {
    
      setIsLoading(true)
      let res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token }
      })
      .then((res)=>{
      setProducts(res.data.data.products)
      setNumOfCart(res.data.numOfCartItems)
      setTotalPrice(res.data.data.totalCartPrice)
      setCartId(res.data.cartId)
      return true
      })
      
     .catch ((error)=>{
          console.log(error)
      return false
     }) 
    
     .finally(()=>{
      setIsLoading(false)
     }) 

    }
  

async function removeItem(id) {
  try {
    let res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers: { token } }
    )
    setProducts(res.data.data.products)
    setNumOfCart(res.data.numOfCartItems)
    setTotalPrice(res.data.data.totalCartPrice)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function updateQuantity(id,count){
return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count} ,  {
        headers:{
            token
        }
    })
    .then((res)=>{
        console.log(res);
      setProducts(res.data.data.products)
      setNumOfCart(res.data.numOfCartItems)
      setTotalPrice(res.data.data.totalCartPrice)
        return true

    })
    .catch((error)=>{
        console.log(error);
        return false;
        
    })
}

function deleteCart(){
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
            token
        }
    })
    .then((res)=>{
        setProducts([])
    setNumOfCart([])
    setTotalPrice([])
    })
    .catch((error)=>{
        console.log(error);
        
    })
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


  return (
    <cartContext.Provider value={{addToCart, getCart, deleteCart, setCartId,  updateQuantity ,isLoading, removeItem, products, numOfCart, cartId, totalPrice}}>
      {children}
    </cartContext.Provider>
  )
}
