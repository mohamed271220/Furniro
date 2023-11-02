import Compare from "../../assets/icons/Compare.jsx";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillPlusCircle } from "react-icons/ai";
import {BiGitCompare} from 'react-icons/bi'
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { compareActions } from "../../store/compareSlice";


const Card = ({ product, addItemToCartHandler, user }) => {
  const dispatch = useDispatch()


  const product1Id = useSelector(state => state.compare.itemOneId)
  const product2Id = useSelector(state => state.compare.itemTwoId)

  const compareHandler = (e) => {
    e.preventDefault();
    if (product1Id && product2Id) {
      dispatch(compareActions.swapItemOneCompare({ id: product?._id }))
    } else {
      dispatch(compareActions.addItemToCompare({ id: product?._id }))
    }

  }

  return (
    <Link
      to={`/product/${product._id}`}
      className="relative w-[35vh] bg-[#F4F5F7]"
    >
      {/* underlying section  */}
      <div >
        <div className="relative">
          <img src={product.images[0]} className="3xl:w-full w-[35vh] h-[45vh]" alt=" " />
          <div onClick={compareHandler} className="lg:hidden absolute bottom-1 left-1 rounded-full h-10 w-10 bg-white bg-opacity-60 text-dim-yellow
        flex items-center justify-center text-2xl  hover:bg-primary transition-all
        ">
            <span className="m-0">
              <BiGitCompare color={"#B88E2F"} />
            </span>
          </div>
          {user &&
            <div onClick={(e) => {
              e.preventDefault();
              addItemToCartHandler({
                productId: product._id,
                name: product.title,
                price: product.price,
                sale: product.sale
              });
            }} className="lg:hidden absolute bottom-1 right-1 rounded-full h-10 w-10 bg-white bg-opacity-60 text-dim-yellow
        flex items-center justify-center text-2xl hover:bg-primary transition-all
        ">
              <span className="m-0 ">
                <AiFillPlusCircle color={"#B88E2F"} />
              </span>
            </div>
          }
        </div>

        <div className="py-3 flex flex-col px-2 gap-2">
          <h3 className=" text-[2.5vh]">{product.title}</h3>
          <p className="text-gray-700 font-semibold text-[2.5vh]">
            {product.ShortDescription}
          </p>
          <div className="flex flex-row justify-between text-gray-700 text-[1.5] ">
            <p className="font-semibold text-[2.5vh] text-black">
              $ {(product.price - product.price * product.sale).toFixed(2)}
            </p>
            <p className="text-[1.7vh]">
              <s>$ {(product.price).toFixed()}</s>
            </p>
          </div>
        </div>
      </div>

      <div
        className="h-full hidden lg:flex flex-col justify-center items-center w-[35vh] absolute opacity-0  bg-slate-950/75 text-white bottom-0 transition-all
 hover:bottom-30 hover:h-220 hover:opacity-100 "
      >
        {user ? <button
          className="bg-white text-dim-yellow text-[2vh] font-bold opacity-1 py-[1.5vh] px-[4vh]
        mb-[1vh]
        "
          onClick={(e) => {
            e.preventDefault();
            addItemToCartHandler({
              productId: product._id,
              name: product.title,
              price: product.price,
              sale: product.sale
            });
          }}
        >
          Add to cart
        </button> :
          <Link
            className="bg-white text-dim-yellow text-[2vh] font-bold opacity-1 py-[1.5vh] px-[4vh]
        mb-[1vh]
        "
            to='/entry'
          >
            Add to cart
          </Link>
        }
        <div className="flex flex-row justify-center items-center flex-wrap lg:flex-nowrap font-semibold  text-[1.6vh] gap-3">
          <p className="flex justify-center items-center flex-row gap-1">
            <span className="m-0">
              <AiOutlineShareAlt size="2.5vh" />
            </span>
            Share
          </p>

          <button onClick={compareHandler} className="flex justify-center items-center cursor-pointer flex-row gap-1">
            <span className="m-0">
              <BiGitCompare />
            </span>
            Compare
          </button>
          <p className="flex justify-center items-center  flex-row gap-1">
            <span className="m-0">
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
