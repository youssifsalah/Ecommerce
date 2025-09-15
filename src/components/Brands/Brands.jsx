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
  /></div>:  <div className='sm:grid grid-cols-1 gap-10 item-center mx-auto px-auto md:grid grid-cols-2 gap-10 item-center mx-auto px-auto lg:grid grid-cols-3 gap-10 item-center mx-auto px-auto'>
{brands.map((brand)=>
<div className='mx-auto'>


 <div className='shadow-2xl '>
  <img src={brand.image} alt='brand'></img>

 </div>
</div>


)}
</div>
   }

  
  </>
 

}
