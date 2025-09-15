import React, { useContext, useState, useEffect } from 'react'
import Style from "./Payment.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { cartContext } from '../../Context/CartContextProvider';
import { useNavigate } from 'react-router-dom';
import AllOrders from '../AllOrders/AllOrders';
 

export default function Payment() {
  const [flagOrder, setFlagOrder] = useState(true); // true = cash, false = online
  const { cartId, getCart } = useContext(cartContext);
  const navigate = useNavigate();

  // make sure cartId is ready
  useEffect(() => {
    if (!cartId) {
      getCart();
    }
  }, [cartId, getCart]);

  async function cashOrder(values) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log("Cash order success:", res.data);
      navigate("/allOrders");
    } catch (error) {
      console.log("Cash order error:", error);
    }
  }

async function onlineOrder(values) {
    let shippingAddress = { shippingAddress: values };
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        shippingAddress,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );  
      navigate("/allOrders");
      console.log("Online order success:", res.data);
      window.open(res.data.session.url, "_self");
    } catch (error) {
      console.log("Online order error:", error);
    }
  }


  function paymentOrder(values) {
    console.log("shippingAddress >>>", { shippingAddress: values });
    if (!cartId) {
      console.log("❌ No cartId, cannot place order.");
      return;
    }
    if (flagOrder) {
      cashOrder(values);
    } else {
      onlineOrder(values);
    }
  }

  const paymentForm = useFormik({
    initialValues: { details: "", city: "", phone: "" },
    onSubmit: paymentOrder,
  });

  return (
    <>
      <form onSubmit={paymentForm.handleSubmit}>
        <div className="relative z-0 w-1/2 mb-5 mx-auto mt-25 group">
          <input
            name="details"
            value={paymentForm.values.details}
            onChange={paymentForm.handleChange}
            type="text"
            id="floating_details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
        </div>

        <div className="relative z-0 w-1/2 mb-5 mx-auto mt-10 group">
          <input
            name="city"
            value={paymentForm.values.city}
            onChange={paymentForm.handleChange}
            type="text"
            id="floating_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
        </div>

        <div className="relative z-0 w-1/2 mb-5 mx-auto mt-10 group">
          <input
            name="phone"
            value={paymentForm.values.phone}
            onChange={paymentForm.handleChange}
            type="tel"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>

          <button
            type="submit"
            onClick={() => setFlagOrder(true)}
            className="mt-15 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mx-auto"
          >
            Cash
          </button>
          <button
            type="submit"
            onClick={() => setFlagOrder(false)}
            className="mt-35 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mx-auto"
          >
            Online
          </button>
        </div>
      </form>
    </>
  )
}
