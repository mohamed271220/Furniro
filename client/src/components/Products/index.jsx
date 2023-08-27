import ProductCard from "../ProductCard";
const Products = ({ products }) => {
  return (
    <section className="padding-sec">
      <div className="text-center">
        <h4 className="font-bold text-[5vh] lg:text-[6vh] pb-[6vh]  2xl:text-3xl  ">
          Our Products
        </h4>
      </div>
      <div className="flex flex-wrap justify-center items-center  flex-row  gap-5 ">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
      <button className=" border-dim-yellow border-2 text-dim-yellow text-center
      font-semibold text-[3vh] lg:text-[3vh] 2xl:text-3xl 
      py-[2vh] px-[7vh]  mt-[4vh]
       ">See more</button>
    </section>
  );
};

export default Products;
