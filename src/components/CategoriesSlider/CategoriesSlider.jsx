import React , {useEffect , useState} from 'react'
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
    swipe: true,
    touchMove: true,
    draggable: true,
    swipeToSlide: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };



  return <>

      <Slider className='mb-10 mt-10 mx-auto rounded-xl w-full max-w-full overflow-hidden' {...settings}>
      {categories.map((category) => 
       <div key={category._id} className='px-1'>
        <div className='w-full h-48 sm:h-52 md:h-56 lg:h-60 bg-gray-100 overflow-hidden rounded-md flex items-center justify-center'>
          <img src={category.image} className='w-full h-full object-contain p-2' alt={category.name} />
        </div>
       </div>
         
        )}

    </Slider>
  
  </>
 

}
