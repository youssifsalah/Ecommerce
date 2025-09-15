import axios from "axios";
import React, { useState, useContext, createContext } from "react";
import { authContext } from "./AuthContextProvider";

export const OrdersContext = createContext();

export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState([]);   // store array of orders
  const [isLoading, setIsLoading] = useState(true)
    let {token} = useContext(authContext)
//    let {token } = useContext(authContext)

  async function getAllOrders() {
    try {
      setIsLoading(true); 
     const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);

      console.log("Orders API response:", data);

      // store the array directly
      if (Array.isArray(data.data)) {
        setOrders(data.data);
      } else {
        setOrders([]); // fallback
      }
    } catch (error) {
      console.error("Error fetching orders", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }
async function removeOrder(orderId) {
  try {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/orders/${orderId}`,
      { headers: { token } }
    );

    // ✅ Update frontend state manually
    setOrders((prev) => prev.filter((order) => order._id !== orderId));

    return true;
  } catch (error) {
    console.error("Error removing order:", error);
    return false;
  }
}





  return (
    <OrdersContext.Provider
      value={{
        isLoading,
        orders,     
       // full array
        ordersCount: orders.length, // count if needed
        getAllOrders,
        removeOrder 
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
