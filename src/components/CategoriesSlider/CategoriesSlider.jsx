import React , {useEffect , useState} from 'react'
import Style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";
export default function CategoriesSlider() {
const [categories, setCategories] = useState([])

async function getCategories(){
 let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
 console.log(data.data);
 setCategories(data.data);
}
useEffect(() => {
getCategories()
  
}, [])
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };



  return <>

      <Slider className='mb-10 mt-25' {...settings}>
      {categories.map((category) => 
       <div>  <img src={category.image} className='w-100 h-[200px] object-cover' alt={category.name} />   </div>
         
        )}

    </Slider>
  
  </>
 

}
