import ProductCard from '../ProductCard'
const Products = ({products}) => {
  return (
    <section className="padding-sec">
           <div className="text-center">
        <h4 className="font-bold text-[5vh] lg:text-[6vh]   2xl:text-3xl  ">Our Products</h4>
      </div>
      <div className="flex flex-wrap justify-center items-center  flex-row  gap-2 ">
        {products.map((product)=>(
            <ProductCard key={product.title} product={product}/>
        )
        
        )}
      </div>
    </section>
  )
}

export default Products