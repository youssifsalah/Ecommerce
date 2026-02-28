import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"

export default function SubCategories() {
  let { id } = useParams()
  const [subcategories, setSubcategories] = useState([])
  const [categoryImage, setCategoryImage] = useState("")

  async function getSubcategories(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
    let filtered = data.data.filter(sub => sub.category === id)
    setSubcategories(filtered)
  }

  async function getCategoryImage(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    setCategoryImage(data.data.image)      
  }

  useEffect(() =>{
    if (id) {
      getSubcategories(id)
      getCategoryImage(id)
    }
  }, [id])

  return <> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 cursor-pointer">
      {subcategories.map((subcat) => 
        <div key={subcat._id} className="p-2 sm:p-4 rounded">
      

  <Link to={`/products/sub/${subcat._id}`}>
  <div className='bg-green-400 p-4 rounded-xl'>
  <img src={categoryImage} alt={subcat.name} className="w-full h-40 object-cover mb-2 rounded" />
          <h1 className="text-center">{subcat.name}</h1>
  </div>
</Link>

        </div>
        
      ) }

    </div>





</>
}
