import React, { useContext, useEffect } from "react"
import { OrdersContext } from "../../Context/OrdersContextProvider"
import toast from "react-hot-toast"

export default function AllOrders() {
  const { getAllOrders, removeOrder, isLoading, orders, ordersCount } = useContext(OrdersContext)

  useEffect(() => {
    getAllOrders()
  }, [])

  async function removeItemFromMYOrders(id) {
    const success = await removeOrder(id)
    if (success) toast.success("Item removed from cart")
    else toast.error("Failed to remove item")
  }

  if (isLoading) {
    return <h2 className="text-center my-5">Loading Orders...</h2>
  }

  const cardOrders = orders.filter((order) => order.paymentMethodType === "card")
  const cashOrders = orders.filter((order) => order.paymentMethodType === "cash")

  function OrdersSection({ title, sectionOrders, emptyText }) {
    return (
      <section className="mb-8">
        <h3 className="text-xl font-bold px-4 py-2 bg-gray-100 rounded-t-lg">{title}</h3>

        {/* Mobile cards */}
        <div className="md:hidden border border-gray-200 border-t-0 rounded-b-lg p-3 space-y-3 bg-white">
          {sectionOrders.length > 0 ? (
            sectionOrders.map((order) => (
              <div key={order._id} className="border border-gray-200 rounded-lg p-3">
                <div className="space-y-2">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-2">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <p className="text-sm">{item.product.title}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-sm space-y-1">
                  <p><span className="font-semibold">Total:</span> {order.totalOrderPrice} EGP</p>
                  <p><span className="font-semibold">Payment:</span> {order.paymentMethodType}</p>
                  <p><span className="font-semibold">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <button
                  onClick={() => removeItemFromMYOrders(order._id)}
                  className="mt-3 text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center py-4">{emptyText}</p>
          )}
        </div>

        {/* Tablet/Desktop table */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-b-lg">
          <table className="w-full min-w-[760px] text-sm text-left text-black bg-white">
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
              {sectionOrders.length > 0 ? (
                sectionOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {order.cartItems.map((item) => (
                          <div key={item._id} className="flex items-center gap-2">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-16 h-16 object-cover rounded"
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
                  <td colSpan="5" className="text-center py-4">{emptyText}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">All Orders</h2>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Total Orders: {ordersCount}</h3>
      </div>

      <OrdersSection title="Cash Orders" sectionOrders={cashOrders} emptyText="No cash orders found" />
      <OrdersSection title="Card Orders" sectionOrders={cardOrders} emptyText="No card orders found" />
    </>
  )
}
