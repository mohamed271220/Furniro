import HomeHero from "../../assets/images/HomeHero.png";
const Hero = () => {
  return (
    <section className="hero relative pb-4 z-20">
      <img src={HomeHero} alt="hero" className="max-w:[100%] h:[100%]" />
      <div className="flex flex-col justify-start  lg:absolute w-[100%]   lg:w-[35%] lg:top-[25%] lg:right-[15%]  py-6 bg-secondary ">
        <div className="flex flex-col px-5">
          <p className="font-medium tracking-widest text-[2vh] xl:text-lg pb-3">
            New Arrival
          </p>
          <h4 className="text-dim-yellow pb-2 lg:pb-3 text-[5vh] lg:text-[6vh] leading-[120%] 2xl:text-3xl   font-bold">
            Discover Our New Collection
          </h4>
          <p className="pb-3 lg:pb-6  text-[2vh] xl:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="bg-dim-yellow text-white text-[2vh] font-semibold w-fit px-3 py-1 xl:text-lg lg:px-5 lg:py-2 lg:w-[50%]">
            {" "}
            BUY NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
