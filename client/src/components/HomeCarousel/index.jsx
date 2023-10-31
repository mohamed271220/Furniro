import Swiper from "./Swiper/index";

const HomeCarousel = ({products}) => {
  return (
    <div
      className="bg-secondary 
    md:py-[5vh] py-[3vh] md:px-[12vh] px-[6vh]
     w-full flex-1 flex lg:flex-row flex-col flex-nowrap"
    >
      <div className="lg:w-[40%] pr-[5vh] py-10 ">
        <h4 className="pb-2 lg:pb-3 md:text-[4vh] text-[3vh] leading-[120%]  font-bold">
          50+ Beautiful rooms inspiration
        </h4>
        <p className="pb-7 lg:pb-6  md:text-[3vh] text-[2vh] ">
          Our designer already made a lot of beautiful prototype of rooms that
          inspire you
        </p>
        <button className="bg-dim-yellow text-white md:text-[3vh] text-[2vh]  font-semibold w-fit px-3 py-1 3xl:text-lg lg:px-5 lg:py-2 lg:w-[50%]">
          {" "}
          Explore More
        </button>
      </div>

      <div className="lg:w-[60%]">
       { products &&  <Swiper products={products} />}
      </div>
    </div>
  );
};

export default HomeCarousel;
