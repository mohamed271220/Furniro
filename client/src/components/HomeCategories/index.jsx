import Bedroom from "../../assets/images/Bedroom.png";
import Dinning from "../../assets/images/Dining.png";
import Living from "../../assets/images/Living.png";

const Cate = () => {
  return (
    <section className="padding-sec">
      <div className="text-center">
        <h4 className="font-bold md:text-[4vh] text-[3vh]    2xl:text-3xl  ">
          Browse The Range
        </h4>
        <p className="md:text-[3vh] text-[2vh]  pb-[6vh]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center flex-row  gap-3 ">
        <div className="flex flex-col justify-center items-center gap-[2.5vh] font-medium ">
          <img
            className="sm:w-full sm:h-full h-[30vh] w-[20vh] object-cover"
            src={Bedroom}
            alt="bedroom"
          />
          <p className="text-[2.1vh] xl:text-lg">Bedroom</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-[2.5vh] font-medium ">
          <img
            className="sm:w-full sm:h-full h-[30vh] w-[20vh] object-cover"
            src={Living}
            alt="living"
          />
          <p className="text-[2.1vh] xl:text-lg">Living</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-[2.5vh] font-medium ">
          <img
            className="sm:w-full sm:h-full h-[30vh] w-[20vh] object-cover"
            src={Dinning}
            alt="dinning"
          />
          <p className="text-[2.1vh] xl:text-lg">Dinning</p>
        </div>
      </div>
    </section>
  );
};

export default Cate;
