import React, { useContext, useState } from 'react';
import Style from "./Login.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from "yup" ;
import logo from "../../assets/YS.png"

import { authContext } from '../../Context/AuthContextProvider';


export default function Login() {
let {setToken} = useContext(authContext)
  let navigate = useNavigate();
  const [ErrMessage, setErrMessage] = useState(null);
const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(values) {

    console.log(values);
    setIsLoading(true)

      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res)=>{
        console.log(res);
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
              navigate("/")
      })
.catch((error)=>{
  console.log(error.response.data.message);
  setErrMessage(error.response.data.message)
}) .finally(()=>{
  setIsLoading(false)
})



  }




let validationSchema = YUP.object().shape({
    email:  YUP.string().email("email is invalid ").required("email is required"),
    password: YUP.string().matches(/^\w{6,15}$/ , "password is invalid").required("paswword is required")
})

  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: ""

    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <>
      {ErrMessage ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">Account Already Exists!</span> {ErrMessage}
        </div>
      ) : null}

<div className='bg-gray-100 mx-auto rounded-2xl w-full max-w-md px-4 sm:px-6'>    
  <img src={logo} alt='logo' className='w-20 mx-auto mb-2 pt-5'></img>
         <form onSubmit={LoginForm.handleSubmit} className='w-full mx-auto'>
        <h2 className='my-5 font-serif text-[25px]'>Login</h2>


    

        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 mt-7">Email:</label>
        <input
          name='email'
          value={LoginForm.values.email}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {LoginForm.errors.email && (
          <div className="text-sm text-red-800 mt-2">{LoginForm.errors.email}</div>
        )}


        <label htmlFor="password" className="block mb-2 mt-7 text-sm font-medium text-gray-900">Password:</label>
        <input
          name='password'
          value={LoginForm.values.password}
          onChange={LoginForm.handleChange}
          onBlur={LoginForm.handleBlur}
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {LoginForm.errors.password && (
          <div className="text-sm text-red-800 mt-2">{LoginForm.errors.password}</div>
        )}





        <button disabled = {isLoading?true:false} 
           type="submit" 
          className="focus:outline-none mt-7 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-12"
        >
          {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Login" }
        </button>
        <p className="text-sm text-gray-700 pb-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-black underline">
            Register
          </Link>
        </p>
      </form>
   </div>


      
    </>
  );
}
