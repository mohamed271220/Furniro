import Images from "../../assets/images/Images.png";
const Hashes = () => {
  return (
    <section
      className="md:py-[56px]
     py-[37px]
       flex flex-col gap-3 justify-center items-center"
    >
      <p className="md:text-[3vh] text-[2vh]  text-gray-600 pb-[0.3vh]">
        Share your setup with
      </p>
      <p className="md:text-[4vh] text-[3vh]  font-bold  text-black">#FuniroFurniture</p>
      <img
        src={Images}
        className="w-[300vh] h-full content-stretch"
        alt="Samples"
      />
    </section>
  );
};

export default Hashes;
