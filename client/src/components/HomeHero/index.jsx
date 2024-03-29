import { Link } from "react-router-dom";
import HomeHero from "../../assets/images/HomeHero.png";
const Hero = () => {
  return (
    <section className="hero relative pb-4 z-20">
      <img src={HomeHero} alt="hero" className="max-w:[100%] w-[210vh] h:[100%]" />
      <div className="flex flex-col justify-start  xl:absolute w-[100%]   xl:w-[40%] xl:top-[25%] xl:right-[15%]  py-12 bg-secondary ">
        <div className="flex flex-col px-5">
          <p className="font-semibold tracking-[1vh] text-[2vh] xl:text-lg pb-3">
            New Arrival
          </p>
          <h4 className="text-dim-yellow pb-2 lg:pb-3 text-[4vh] md-[5vh] lg:text-[6vh] leading-[120%] 2xl:text-[4.5rem]   font-bold">
            Discover Our New Collection
          </h4>
          <p className="pb-7 lg:pb-6  text-[2vh] xl:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to='/shop' className="bg-dim-yellow text-center text-white text-[2vh] font-semibold w-fit px-3 py-1 xl:text-lg lg:px-5 lg:py-2 lg:w-[50%]">
            {" "}
            BUY NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
