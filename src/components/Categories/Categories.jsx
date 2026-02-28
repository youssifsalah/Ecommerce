import React , {useEffect , useState} from 'react'
import Style from "./Categories.module.css"
import axios from 'axios'
import { useParams , Link } from 'react-router-dom'
import {ColorRing} from 'react-loader-spinner'
export default function Categories() {

const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

async function getCategories(){
   setIsLoading(true)
 let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

 console.log(data.data);
 setCategories(data.data);
  setIsLoading(false)
}
useEffect(() => {
getCategories()
  
}, [])
  return <>
<h1 className='text-3xl sm:text-4xl font-extrabold font-serif tracking-wide mb-4'>Categories</h1>
{isLoading?<div className='flex justify-center'><ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64']}
  /></div>: 
  

 
 <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-8 gap-6">
    {categories.map((category)=>
   <div key={category._id}>
       <Link to={`/SubCategories/${category._id}`}>
       <div className='rounded-2xl p-3 bg-gray-100 '>
    <img src={category.image} className='w-full h-52 object-cover rounded-xl' alt={category.name}></img>
    <h3 className='font-serif text-xl text-center'>{category.name}</h3>
       </div>

       </Link>

   </div>
)}
</div>}







  
  </>
 

}
