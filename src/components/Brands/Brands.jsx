import React , {useEffect , useState} from 'react'
import Style from "./Brands.module.css"
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
export default function Brands() {
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(false)
async function getBrands(){
  setIsLoading(true)
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  console.log(data.data);
  setBrands(data.data)
    setIsLoading(false)
}
 
useEffect(() => {
  getBrands()
}, [])




  return <>
{isLoading?<div className='flex justify-center'><ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64']}
  /></div>:  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
{brands.map((brand)=>
<div className='mx-auto w-full' key={brand._id}>


 <div className='shadow-2xl rounded-xl overflow-hidden'>
  <img src={brand.image} alt='brand' className='w-full h-40 sm:h-48 object-cover'></img>

 </div>
</div>


)}
</div>
   }

  
  </>
 

}
