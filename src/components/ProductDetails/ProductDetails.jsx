import React , {useEffect , useState} from 'react' 
import Style from "./ProductDetails.module.css"
import axios from 'axios'
import { useParams , Link } from 'react-router-dom'
import {ColorRing} from 'react-loader-spinner'

export default function ProductDetails() {

  let {id} = useParams()

  const [isLoading, setisLoading] = useState(false)
  const [product, setProduct] = useState(null)
  const [relatedProduct, setrelatedProduct] = useState([])

  async function getSpecific (id){
     setisLoading(true)
     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
     console.log("Specific product:", data.data);
     setProduct(data.data)
     setisLoading(false)

    
     getProducts(data.data.category._id , data.data._id)
  }

  async function getProducts(categoryId , currentId){
     let {data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/products")
     console.log("All products:", data.data);

     let newProducts = data.data.filter((item)=>{
       return item.category._id == categoryId && item._id !== currentId
     })

     console.log("Related products:", newProducts);
     setrelatedProduct(newProducts)
  }

  useEffect(()=>{
    getSpecific(id)
  } , [id])




if (isLoading || !product) {
    return (
      <div className="flex justify-center p-10">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          colors={['#e15b64']}
        />
      </div>
    )
  }

  return <> 
    <div className='grid grid-cols-[1fr_2fr] gap-3 items-center'>
      <div className='bg-red-600'>
        <img src={product.imageCover} alt={product.title} />
      </div>
      <div >
        <h2 className='text-xl font-bold mb-5'>{product.title}</h2>
        <h3 className='mb-2'>{product.description}</h3>
        <h3 className='mb-2'>{product.category.name}</h3>
               <div className='flex justify-between'>
        {product.priceAfterDiscount ? (
          <>
            <h3 className='text-red-500 line-through'>{product.price} EGP</h3>
            <h3 className='font-bold'>{product.priceAfterDiscount} EGP</h3>
          </>
        ) : (
          <h3>{product.price} EGP</h3>
        )}

        <span className='flex items-center  gap-1 mt-2'>
          <i className='fas fa-star text-yellow-400'></i>
          {product.ratingsAverage}
        </span>
        </div>
<button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-220 mt-5">
        Add To cart</button>
      </div>
    </div>
<div className='mt-25'>
<h1 className='text-green-700 font-bold font-serif text-2xl mb-10'>Related Products</h1>  
    <div className='parent grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
      {relatedProduct?.map((product) => (
        <div className='group overflow-hidden relative cursor-pointer shadow-xl p-2' key={product._id}>
          <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
            <img src={product.imageCover} alt={product.title}/>
            <h3>{product.category.name}</h3>
            <h2>{product.title.split(" ", 2).join(" ")}</h2>
            <div className='flex justify-between'>
              {product.priceAfterDiscount ? (
                <>
                  <h3 className='text-red-500 line-through'>{product.price} EGP </h3>
                  <h3>{product.priceAfterDiscount} EGP </h3>
                </>
              ) : (
                <h3>{product.price} EGP </h3>
              )}
              <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
            </div>
            {product.priceAfterDiscount && ( 
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-sm">
                Sale
              </span>
            )}
          </Link>
          <button type="button" className="group-hover:translate-y-0 translate-y-[200%] transition-all duration-500 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2">
            Add To Cart 
          </button>
        </div>
      ))}
    </div>
</div>


 </>
}  
         