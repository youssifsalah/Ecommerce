import {DisplayProducts} from '../DisplayProducts/DisplayProducts'
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider"
export  function Home() {

   

  return <>
  <CategoriesSlider/>
<h1 className="mx-auto text-center w-full md:w-10/12 text-black text-3xl sm:text-4xl font-extrabold font-serif tracking-wide">
  Welcome to YS Mart !
</h1>

<p className="mb-6 text-center text-lg sm:text-2xl w-full md:w-8/12 mx-auto">
  Explore All Products Now
</p>
<DisplayProducts/>


</>
}


