import HomeHero from "./assets/HomeHero.png";
import Bedroom from "./assets/Bedroom.png";
import Dinning from "./assets/Dining.png";
import Living from "./assets/Living.png";
const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center
  w-full
  "
    >
      <section className="hero relative">
        <img src={HomeHero} alt="hero" className="max-w:[100%] h:[100%]" />
        <div className="flex flex-col justify-start absolute top-[25%] right-[10%] w-[35%] py-6 bg-secondary ">
          <div className="flex flex-col px-5">
            <p className="font-bold text-[16px]">New Arrival</p>
            <h4 className="text-dim-yellow pb-4  text-[52px] font-bold md:leading-[8vh] leading-loose">
              Discover Our <br />
              New Collection
            </h4>
            <p className="pb-10 font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <button className="bg-dim-yellow text-white font-bold px-5 py-2 w-[50%]">
              {" "}
              BUY NOW
            </button>
          </div>
        </div>
      </section>

      <section className="padding-sec">
        <div className="text-center">
          <h4>Browse The Range</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="flex flex-row space-x-10 ">
          <div>
            <img src={Bedroom} alt="bedroom" />
            <p></p>
          </div>
          <div>
            <img src={Living} alt="living" />
            <p></p>
          </div>
          <div>
            <img src={Dinning} alt="dinning" />
            <p></p>
          </div>
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  );
};

export default Home;
