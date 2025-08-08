import React, { useState } from 'react';
import Style from "./Register.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as YUP from "yup" ;
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContextProvider';

export default function Register() {
let {setToken} = useContext(authContext)
  let navigate = useNavigate();
  const [ErrMessage, setErrMessage] = useState(null);
const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(values) {

    console.log(values);

      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res)=>{
        console.log(res.data);
                setToken(res.data.token)
                        localStorage.setItem("token",res.data.token)
              navigate("/Login")
      })
.catch((error)=>{
  console.log(error.response.data.message);
  setErrMessage(error.response.data.message)
}) .finally(()=>{
  setLoading(false)
})



  }




let validationSchema = YUP.object().shape({
   name: YUP.string().min(3,"name min is 3 char").max(10,"name max is 10 char").required(),
    email:  YUP.string().email("email is invalid ").required("email is required"),
    password: YUP.string().matches(/^\w{6,15}$/ , "password is invalid").required("paswword is required"),
    rePassword:YUP.string().oneOf([YUP.ref("password")] , "password and repassword dont match ").required("pasword is required"),
    phone: YUP.string().matches(/^01[0125][0-9]{8}$/,"phone is wrong").required("phone number is required")
})

  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      {ErrMessage ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span className="font-medium">Account Already Exists!</span> {ErrMessage}
        </div>
      ) : null}

      <form onSubmit={registerForm.handleSubmit} className='w-6/7 px-15 mx-auto'>
        <h2 className='my-5 mt-25 text-[25px]'>Register Now</h2>


        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
        <input
          name='name'
          value={registerForm.values.name}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="text"
          id="first_name"
          placeholder="Enter Your Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.errors.name && (
          <div className="text-sm text-red-800 mt-2">{registerForm.errors.name}</div>
        )}


        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 mt-7">Email:</label>
        <input
          name='email'
          value={registerForm.values.email}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.errors.email && (
          <div className="text-sm text-red-800 mt-2">{registerForm.errors.email}</div>
        )}


        <label htmlFor="password" className="block mb-2 mt-7 text-sm font-medium text-gray-900">Password:</label>
        <input
          name='password'
          value={registerForm.values.password}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.errors.password && (
          <div className="text-sm text-red-800 mt-2">{registerForm.errors.password}</div>
        )}


        <label htmlFor="rePassword" className="block mt-7 mb-2 text-sm font-medium text-gray-900">Re-Password:</label>
        <input
          name='rePassword'
          value={registerForm.values.rePassword}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="password"
          id="rePassword"
          placeholder="Re-enter Your Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.errors.rePassword && (
          <div className="text-sm text-red-800 mt-2">{registerForm.errors.rePassword}</div>
        )}


        <label htmlFor="phone" className="block mt-7 mb-2 text-sm font-medium text-gray-900">Phone:</label>
        <input
          name='phone'
          value={registerForm.values.phone}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          type="tel"
          id="phone"
          placeholder="Enter Your Phone Number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {registerForm.errors.phone && (
          <div className="text-sm text-red-800 mt-2">{registerForm.errors.phone}</div>
        )}


        <button disabled = {isLoading?true:false} 
           type="submit" 
          className="focus:outline-none mt-7 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {isLoading ? <i className='fas fa-spin fa-spinner'></i> : "Register" }
        </button>
      </form>
    </>
  );
}
