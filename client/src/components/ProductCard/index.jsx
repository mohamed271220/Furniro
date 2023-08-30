import Ex from "../../assets/images/Ex.png";
import Compare from "../../assets/icons/Compare.jsx";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";

const Card = ({ product }) => {

  return (
    <Link to={`/product/${product.id}`} className="relative w-[35vh] bg-[#F4F5F7]">
      {/* underlying section  */}
      <div>
        <img src={Ex} className="3xl:w-full w-[35vh] h-[45vh]" alt=" " />
        <div className="py-3 flex flex-col px-2 gap-2">
          <h3 className="font-bold text-[3vh]">{product.title}</h3>
          <p className="text-gray-700 font-semibold text-[2.5vh]">{product.ShortDescription}</p>
          <div className="flex flex-row justify-between text-gray-700 text-[1.5] ">
            <p className="font-semibold text-[3vh] text-black">
              $ {product.price - product.price * product.sale}
            </p>
            <p className="text-[1.7vh]">
              <s>$ {product.price}</s>
            </p>
          </div>
        </div>
      </div>

      <div
        className="h-full flex flex-col justify-center items-center w-[35vh] absolute opacity-0  bg-slate-950/75 text-white bottom-0 transition-all
 hover:bottom-30 hover:h-220 hover:opacity-100 "
      >
        <button
          className="bg-white text-dim-yellow text-[2vh] font-bold opacity-1 py-[1.5vh] px-[4vh]
        mb-[1vh]
        "
        onClick={(e)=>{
          e.preventDefault();
        console.log(product)
        }}
        >
          Add to cart
        </button>
        <div className="flex flex-row justify-center items-center flex-wrap lg:flex-nowrap font-semibold  text-[1.6vh]">
          <p className="flex justify-center items-center flex-row gap-1">
            <span>
              <AiOutlineShareAlt size="2.5vh" />
            </span>
            Share
          </p>

          <p className="flex justify-center items-center flex-row gap-1">
            <span className="">
              <Compare />
            </span>
            Compare
          </p>
          <p className="flex justify-center items-center  flex-row gap-1">
            <span>
              <AiOutlineHeart fontWeight={800} size="2.5vh" />
            </span>
            Like
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
