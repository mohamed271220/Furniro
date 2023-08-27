import Swiper from "./Swiper/index";

const HomeCarousel = () => {
  return (
    <div
      className="bg-secondary 
    md:py-[5vh] py-[3vh] md:px-[12vh] px-[6vh]
     w-full flex-1 flex lg:flex-row flex-col flex-nowrap"
    >
      <div className="lg:w-[30%] pr-[5vh] py-10 ">
        <h4 className="pb-2 lg:pb-3 text-[4vh] lg:text-[4vh] leading-[120%] 2xl:text-3xl   font-bold">
          50+ Beautiful rooms inspiration
        </h4>
        <p className="pb-7 lg:pb-6  text-[2vh] xl:text-lg">
          Our designer already made a lot of beautiful prototipe of rooms that
          inspire you
        </p>
        <button className="bg-dim-yellow text-white text-[2vh] font-semibold w-fit px-3 py-1 xl:text-lg lg:px-5 lg:py-2 lg:w-[50%]">
          {" "}
          Explore More
        </button>
      </div>

      <div className="lg:w-[70%]">
        <Swiper />
      </div>
    </div>
  );
};

export default HomeCarousel;
