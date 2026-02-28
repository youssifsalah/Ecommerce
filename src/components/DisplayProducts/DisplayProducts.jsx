import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"
import toast from "react-hot-toast"
import { cartContext } from "../../Context/CartContextProvider"
import { WishlistContext } from "../../Context/WishlistContextProvider"

export function DisplayProducts() {
  const { addToCart } = useContext(cartContext)
  const { addToWishlist } = useContext(WishlistContext)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState(null)
  const { subcategoryId } = useParams()

  async function getProducts() {
    setIsLoading(true)
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/")
    let allProducts = data.data

    if (subcategoryId) {
      allProducts = allProducts.filter((prod) =>
        prod.subcategory?.some((sc) => sc._id === subcategoryId)
      )
    }

    setProducts(allProducts)
    setIsLoading(false)
  }

  async function addToWishlistProduct(id) {
    const flag = await addToWishlist(id)
    if (flag) toast.success("Item Added successfully")
    else toast.error("Failed to add")
  }

  async function addToCartProduct(id) {
    const flag = await addToCart(id)
    if (flag) toast.success("Item Added successfully")
    else toast.error("Failed to add")
  }

  useEffect(() => {
    getProducts()
  }, [subcategoryId])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64"]}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {products?.map((product) => (
            <div
              className="group overflow-hidden relative cursor-pointer shadow-2xl p-3 rounded-3xl bg-white h-full flex flex-col"
              key={product._id}
            >
              <Link to={`/ProductDetails/${product._id}/${product.category}`} className="flex-1 flex flex-col">
                <img src={product.imageCover} alt={product.title} className="w-full rounded-xl mb-2" />
                <h2 className="text-black font-bold">{product.title.split(" ", 2).join(" ")}</h2>
                <p className="text-gray-600">{product.category?.name}</p>

                <div className="flex justify-between items-center mt-2">
                  {product.priceAfterDiscount ? (
                    <>
                      <h3 className="text-red-500 line-through text-sm">{product.price} EGP</h3>
                      <h3 className="font-semibold">{product.priceAfterDiscount} EGP</h3>
                    </>
                  ) : (
                    <h3 className="font-semibold">{product.price} EGP</h3>
                  )}
                  <span><i className="fas fa-star text-yellow-400"></i>{product.ratingsAverage}</span>
                </div>

                {product.priceAfterDiscount ? (
                  <span className="inline-block self-start mt-2 text-sm font-medium px-2.5 py-0.5 rounded-sm bg-red-700 text-white">
                    Sale
                  </span>
                ) : null}
              </Link>

              <div className="mt-auto pt-3 flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => addToCartProduct(product._id)}
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
                  onClick={() => addToWishlistProduct(product._id)}
                  type="button"
                  className="cursor-pointer text-gray-900 hover:text-red-800 text-3xl leading-none"
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
