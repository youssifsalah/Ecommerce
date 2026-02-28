import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"
import toast from "react-hot-toast"
import { cartContext } from "../../Context/CartContextProvider"
import { WishlistContext } from "../../Context/WishlistContextProvider"

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useContext(cartContext)
  const { getWishlist, toggleWishlist, isInWishlist } = useContext(WishlistContext)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [relatedProduct, setRelatedProduct] = useState([])
  const [hoveredHeartId, setHoveredHeartId] = useState(null)

  async function addToCartProduct(productId) {
    const flag = await addToCart(productId)
    if (flag) toast.success("Item Added successfully")
    else toast.error("Failed to add")
  }

  async function toggleWishlistProduct(productId) {
    const wasInWishlist = isInWishlist(productId)
    const flag = await toggleWishlist(productId)
    if (flag) toast.success(wasInWishlist ? "Item removed from wishlist" : "Item Added successfully")
    else toast.error("Failed to update wishlist")
  }

  async function getSpecific(productId) {
    setIsLoading(true)
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    setProduct(data.data)
    setIsLoading(false)
    getProducts(data.data.category._id, data.data._id)
  }

  async function getProducts(categoryId, currentId) {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    const newProducts = data.data.filter(
      (item) => item.category._id === categoryId && item._id !== currentId
    )
    setRelatedProduct(newProducts)
  }

  useEffect(() => {
    getSpecific(id)
  }, [id])

  useEffect(() => {
    getWishlist()
  }, [])

  if (isLoading || !product) {
    return (
      <div className="flex justify-center p-10">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={["#e15b64"]}
        />
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <img src={product.imageCover} alt={product.title} className="w-full rounded-xl" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{product.title}</h2>
          <h3 className="mb-2">{product.description}</h3>
          <h3 className="mb-2">{product.category.name}</h3>
          <div className="flex justify-between items-center">
            {product.priceAfterDiscount ? (
              <>
                <h3 className="text-red-500 line-through">{product.price} EGP</h3>
                <h3 className="font-bold">{product.priceAfterDiscount} EGP</h3>
              </>
            ) : (
              <h3>{product.price} EGP</h3>
            )}

            <span className="flex items-center gap-1 mt-2">
              <i className="fas fa-star text-yellow-400"></i>
              {product.ratingsAverage}
            </span>
          </div>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 w-full sm:w-auto"
          >
            Add To cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-green-700 font-bold font-serif text-2xl mb-6">Related Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {relatedProduct?.map((item) => (
            <div className="group overflow-hidden relative cursor-pointer shadow-xl p-3 rounded-xl" key={item._id}>
              <Link to={`/ProductDetails/${item._id}/${item.category.name}`}>
                <img src={item.imageCover} alt={item.title} className="w-full rounded-lg" />
                <h3>{item.category.name}</h3>
                <h2>{item.title.split(" ", 2).join(" ")}</h2>
                <div className="flex justify-between">
                  {item.priceAfterDiscount ? (
                    <>
                      <h3 className="text-red-500 line-through">{item.price} EGP</h3>
                      <h3>{item.priceAfterDiscount} EGP</h3>
                    </>
                  ) : (
                    <h3>{item.price} EGP</h3>
                  )}
                  <span><i className="fas fa-star text-yellow-400"></i>{item.ratingsAverage}</span>
                </div>
                {item.priceAfterDiscount && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-sm mt-1">
                    Sale
                  </span>
                )}
              </Link>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => addToCartProduct(item._id)}
                  className="inline-flex items-center bg-black text-white hover:bg-gray-800 border border-transparent text-sm px-4 py-2.5 rounded-3xl"
                >
                  <svg
                    className="w-4 h-4 me-1.5 -ms-0.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    />
                  </svg>
                  Add To Cart
                </button>
                <button
                  onMouseEnter={() => setHoveredHeartId(item._id)}
                  onMouseLeave={() => setHoveredHeartId(null)}
                  onClick={() => toggleWishlistProduct(item._id)}
                  type="button"
                  className={`cursor-pointer text-3xl leading-none transition-colors ${
                    isInWishlist(item._id) ? "text-red-600" : "text-gray-900 hover:text-red-600"
                  }`}
                >
                  <i
                    className={`${
                      isInWishlist(item._id) || hoveredHeartId === item._id
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-heart`}
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
