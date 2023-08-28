import ProductCard from "../ProductCard";
const Products = ({ products }) => {
  return (
    <section className=" md:py-[56px] py-[37px] md:px-[121px] px-[4vh] flex flex-col gap-3 justify-center items-center">
      <div className="text-center">
        <h4 className="font-bold md:text-[4vh] text-[3vh]  pb-[6vh]  2xl:text-3xl  ">
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
