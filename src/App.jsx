import './App.css'
import { createHashRouter, createBrowserRouter ,  RouterProvider } from 'react-router-dom'
import Layout from '../src/components/Layout/Layout'
import { Home } from '../src/components/Home/Home'
import { Products } from '../src/components/Products/Products'
import  Cart  from '../src/components/Cart/Cart'
import  WishList  from '../src/components/WishList/WishList'
import  Brands  from '../src/components/Brands/Brands'
import Categories  from '../src/components/Categories/Categories'
import  Login  from '../src/components/Login/Login'
import  NotFound  from '../src/components/NotFound/NotFound'
import  Register  from '../src/components/Register/Register'
import AuthContextProvider from './Context/AuthContextProvider'; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import SubCategories from './components/SubCategories/SubCategories'
import { DisplayProducts } from './components/DisplayProducts/DisplayProducts'
import CartContextProvider from './Context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import WishlistContextProvider from './Context/WishlistContextProvider.jsx'
import OrdersContextProvider from './Context/OrdersContextProvider.jsx'
import Footer from './components/Footer/Footer.jsx'



export default function App() {
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

        { path: '', element:  <ProtectedRoute><Home /></ProtectedRoute>},
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>  } ,
        { path: 'payment', element: <ProtectedRoute><Payment/></ProtectedRoute>  } ,
        { path: "allOrders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "allOrders/*", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "allorders/*", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute>  } ,
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>  } ,
        { path: 'login', element: <Login /> } , 
        { path: 'cart', element:<ProtectedRoute><Cart /></ProtectedRoute>  } , 
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>  } ,
        { path: 'SubCategories/:id', element: <ProtectedRoute><SubCategories /></ProtectedRoute>  } ,
        { path: '/products/sub/:subcategoryId', element: <ProtectedRoute><DisplayProducts /></ProtectedRoute>  } ,
        { path: 'ProductDetails/:id/:category', element:<ProtectedRoute><ProductDetails /></ProtectedRoute>  } , 
        { path: 'register', element: <Register /> } , 
        { path: '*', element: <NotFound /> }



    ]
  }
])
  return<>

<AuthContextProvider>

  <WishlistContextProvider>
  <CartContextProvider>
  <OrdersContextProvider>
 <RouterProvider router={router} />
 <Toaster/>
 </OrdersContextProvider>
  </CartContextProvider>
    </WishlistContextProvider>
</AuthContextProvider>


   </>
}
