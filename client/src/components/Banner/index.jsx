import ShopBanner from "../../assets/images/ShopBanner.png";
const Banner = ({ title, path }) => {
  return (
    <div className="relative w-full flex justify-center items-center ">
      <img src={ShopBanner} alt="" className="w-full h-full object-cover" />
      <h1 className="absolute  text-lg md:text-[6vh] font-semibold ">
        {title}
      </h1>
      {path && (
        <p className="hidden md:flex absolute bg-white bg-opacity-60 left-0  bottom-1 flex-row flex-nowrap">
          {path.map((item, index) => (
            <>
              <span key={item} className="text-center text-[3vh] ">
                {item}
              </span>
              <span className="text-center text-[3vh]">
                {" "}
                {index < path.length - 1 && ">"}{" "}
              </span>
            </>
          ))}
        </p>
      )}
    </div>
  );
};

export default Banner;
