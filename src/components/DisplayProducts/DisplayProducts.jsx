import React , {useContext, useEffect , useState} from 'react'
import Style from "./DisplayProducts.module.css"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import {ColorRing} from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { cartContext } from '../../Context/CartContextProvider'
import AllOrders from '../AllOrders/AllOrders'
import { WishlistContext } from '../../Context/WishlistContextProvider'

export function DisplayProducts() {
  let {addToCart} = useContext(cartContext)
    let {addToWishlist} = useContext(WishlistContext)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState(null)

  // get optional subcategoryId from URL
  let { subcategoryId } = useParams()

  async function getProducts() {
    setIsLoading(true)

    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/")
    let allProducts = data.data

    // if subcategoryId exists, filter products
    if (subcategoryId) {
allProducts = allProducts.filter(prod => 
  prod.subcategory?.some(sc => sc._id === subcategoryId)
)
    }

    setProducts(allProducts)
    setIsLoading(false)
  }

   async function addToWishlistProduct(id) {
    let flag = await addToWishlist(id)
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
   
   


  useEffect(() => {
    getProducts()
  }, [subcategoryId]) 

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center'>
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
      ) : (
        <div className='parent grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
          {products?.map((product) => (
            <div className='group overflow-hidden relative cursor-pointer shadow-xl p-2' key={product._id}>
              <Link to={`/ProductDetails/${product._id}/${product.category}`}>
                <img src={product.imageCover} alt={product.title}/>
                <h3>{product.category.name}</h3>
                <h2>{product.title.split(" ", 2).join(" ")}</h2>
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
                  <span className="bg-red-100 text-red-800  mb-10 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                    Sale
                  </span>
                ) : null}
              </Link>
<div >
                <button
                onClick={()=>{addToCartProduct(product._id)}}
                type="button"
                className="group-hover:translate-y-0 translate-y-[260%] transition-all duration-500 text-white 
                bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br 
                focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 
                shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add To Cart
              </button> 
              <button 
              onClick={()=>{addToWishlistProduct(product._id)}}
              type="button"
                className="cursor-pointer group-hover:translate-y-0 translate-y-[270%] transition-all  duration-500
                text-gray-900
                hover:text-red-800 text-4xl"
              ><i class="fa-solid fa-heart"></i></button>
</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
