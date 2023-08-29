import Trophy from "../../assets/icons/trophy.svg";
import Guarantee from "../../assets/icons/guarantee.svg";
import Shopping from "../../assets/icons/shipping.svg";
import CustomerSupport from "../../assets/icons/customer-support.svg";
const CertiBanner = () => {
  return (
    <div className="flex flex-nowrap flex-row gap-[4vh] bg-secondary h-[30vh] w-full justify-center items-center">
      <div className="flex flex-row h-[9vh] gap-[1vh]">
        <img src={Trophy} className="h-[9vh]" alt="trophy" />
        <div className="flex flex-col justify-between">
          <h3 className="font-bold text-[3vh]">High Quality</h3>
          <h4 className="text-gray-400 font-semibold text-[2.2vh]">
            crafted from top materials
          </h4>
        </div>
      </div>
      <div className="flex flex-row h-[9vh] gap-[1vh]">
        <img className="h-[9vh]" src={Guarantee} alt="Guarantee" />
        <div className="flex flex-col justify-between">
          <h3 className="font-bold text-[3vh]">Warranty Protection</h3>
          <h4 className="text-gray-400 font-semibold text-[2.2vh]">Over 2 years</h4>
        </div>
      </div>
      <div className="flex flex-row h-[9vh] gap-[1vh]">
        <img className="h-[9vh]" src={Shopping} alt="shopping" />
        <div className="flex flex-col justify-between">
          <h3 className="font-bold text-[3vh]">Free Shipping</h3>
          <h4 className="text-gray-400 font-semibold text-[2.2vh]">Order over 150 $</h4>
        </div>
      </div>
      <div className="flex flex-row h-[9vh] gap-[1vh]">
        <img className="h-[9vh]" src={CustomerSupport} alt="" />
        <div className="flex flex-col justify-between">
          <h3 className="font-bold text-[3vh]">24 / 7 Support</h3>
          <h4 className="text-gray-400 font-semibold text-[2.2vh]">Dedicated support</h4>
        </div>
      </div>
    </div>
  );
};

export default CertiBanner;
