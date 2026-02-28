import axios from "axios"
import React, { useState, useContext, createContext } from "react"
import { authContext } from "./AuthContextProvider"

export const OrdersContext = createContext()

function getUserIdFromToken(token) {
  if (!token) return null
  try {
    const payload = token.split(".")[1]
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
    const decoded = JSON.parse(atob(normalized))
    return decoded?.id || decoded?.userId || null
  } catch {
    return null
  }
}

export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useContext(authContext)

  async function getAllOrders() {
    const userId = getUserIdFromToken(token)
    if (!userId) {
      setOrders([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

      if (Array.isArray(data)) {
        setOrders(data)
      } else if (Array.isArray(data?.data)) {
        setOrders(data.data)
      } else {
        setOrders([])
      }
    } catch (error) {
      console.error("Error fetching orders", error)
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  async function removeOrder(orderId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`, {
        headers: { token },
      })
      setOrders((prev) => prev.filter((order) => order._id !== orderId))
      return true
    } catch (error) {
      console.error("Error removing order:", error)
      return false
    }
  }

  return (
    <OrdersContext.Provider
      value={{
        isLoading,
        orders,
        ordersCount: orders.length,
        getAllOrders,
        removeOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
