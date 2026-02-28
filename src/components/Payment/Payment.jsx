import React, { useContext, useEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import axios from "axios"
import { cartContext } from "../../Context/CartContextProvider"
import { useNavigate } from "react-router-dom"

export default function Payment() {
  const paymentMethodRef = useRef("cash")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartId, getCart } = useContext(cartContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cartId) getCart()
  }, [cartId, getCart])

  async function cashOrder(values) {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress: values },
      { headers: { token: localStorage.getItem("token") } }
    )
    return res.data
  }

  async function onlineOrder(values) {
    const returnUrl = `${window.location.origin}/#/allorders`
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
      { shippingAddress: values },
      { headers: { token: localStorage.getItem("token") } }
    )
    return res.data
  }

  async function paymentOrder(values) {
    if (!cartId) return

    try {
      setIsSubmitting(true)

      if (paymentMethodRef.current === "cash") {
        await cashOrder(values)
        navigate("/allorders")
        return
      }

      const data = await onlineOrder(values)
      if (data?.session?.url) {
        window.location.href = data.session.url
      }
    } catch (error) {
      console.log("Payment error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const paymentForm = useFormik({
    initialValues: { details: "", city: "", phone: "" },
    onSubmit: paymentOrder,
  })

  return (
    <form onSubmit={paymentForm.handleSubmit} className="w-full max-w-2xl mx-auto px-4 sm:px-6 mt-6">
      <div className="relative z-0 w-full mb-5 mx-auto group">
        <input
          name="details"
          value={paymentForm.values.details}
          onChange={paymentForm.handleChange}
          type="text"
          id="floating_details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
      </div>

      <div className="relative z-0 w-full mb-5 mx-auto mt-8 group">
        <input
          name="city"
          value={paymentForm.values.city}
          onChange={paymentForm.handleChange}
          type="text"
          id="floating_address"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
      </div>

      <div className="relative z-0 w-full mb-5 mx-auto mt-8 group">
        <input
          name="phone"
          value={paymentForm.values.phone}
          onChange={paymentForm.handleChange}
          type="tel"
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="submit"
            onClick={() => {
              paymentMethodRef.current = "cash"
            }}
            disabled={isSubmitting}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center disabled:opacity-70"
          >
            Pay Cash
          </button>
          <button
            type="submit"
            onClick={() => {
              paymentMethodRef.current = "online"
            }}
            disabled={isSubmitting}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center disabled:opacity-70"
          >
            Pay Online
          </button>
        </div>
      </div>
    </form>
  )
}
