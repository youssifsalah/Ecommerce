import React, { useContext, useEffect } from "react";
import Style from "./AllOrders.module.css";
import { OrdersContext } from "../../Context/OrdersContextProvider";
import toast from "react-hot-toast";

export default function AllOrders() {
  let { getAllOrders,removeOrder,  isLoading, orders, ordersCount } = useContext(OrdersContext);

  useEffect(() => {
    getAllOrders();
  }, []);


  async function removeItemFromMYOrders(id) {
  let success = await removeOrder(id)
  if (success) {
    toast.success("Item removed from cart ✅")
  } else {
    toast.error("Failed to remove item ❌")
  }
}


  if (isLoading) {
    return <h2 className="text-center my-5">Loading Orders...</h2>;
  }

  // Separate orders by payment method
  const cardOrders = orders.filter((order) => order.paymentMethodType === "card");
  const cashOrders = orders.filter((order) => order.paymentMethodType === "cash");

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">All Orders</h2>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Total Orders: {ordersCount}</h3>
      </div>

      {/* CASH ORDERS */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
        <h3 className="text-xl font-bold px-4 py-2 bg-gray-100">Cash Orders</h3>
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-black uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Payment</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
{cashOrders.length > 0 ? (
  cashOrders.map((order) => (
    <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
   <td className="px-6 py-4">
  <div className="flex flex-col gap-2">
    {order.cartItems.map((item) => (
      <div key={item._id} className="flex items-center gap-2">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-25 object-cover rounded"
        />
        <span>{item.product.title}</span>
      </div>
    ))}
  </div>
</td>

          


      <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
      <td className="px-6 py-4 capitalize">{order.paymentMethodType}</td>
      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4">
          <span
    onClick={() => removeItemFromMYOrders(order._id)} 
  className="cursor-pointer font-medium text-red-600 hover:underline"
>
  Remove
</span>

        </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="text-center py-4">No cash orders found</td>
  </tr>
)}
          </tbody>
        </table>
      </div>

      {/* CARD ORDERS */}
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
        <h3 className="text-xl font-bold px-4 py-2 bg-gray-100">Card Orders</h3>
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-black uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Payment</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
{cardOrders.length > 0 ? (
  cardOrders.map((order) => (
    <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
   <td className="px-6 py-4">
  <div className="flex flex-col gap-2">
    {order.cartItems.map((item) => (
      <div key={item._id} className="flex items-center gap-2">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-25  object-cover rounded"
        />
        <span>{item.product.title}</span>
      </div>
    ))}
  </div>
</td>

  


      <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
      <td className="px-6 py-4 capitalize">{order.paymentMethodType}</td>
      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4">
          <span
    onClick={() => removeItemFromMYOrders(order._id)} 
  className="cursor-pointer font-medium text-red-600 hover:underline"
>
  Remove
</span>

        </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="text-center py-4">No Card orders found</td>
  </tr>
)}
          </tbody>
        </table>
      </div>
    </>
  )
}

