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



export default function App() {
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

        { path: '', element:  <ProtectedRoute><Home /></ProtectedRoute>},
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>  } ,
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute>  } ,
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>  } ,
        { path: 'login', element: <Login /> } , 
        { path: 'cart', element:<ProtectedRoute><Cart /></ProtectedRoute>  } , 
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>  } ,
        { path: 'register', element: <Register /> } , 
        { path: 'notfound', element: <NotFound /> }

    ]
  }
])
  return<>

<AuthContextProvider>
 <RouterProvider router={router} />
</AuthContextProvider>


   </>
}
