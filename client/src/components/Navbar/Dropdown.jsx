import { useState } from "react";
import {
  AiFillBell,
  AiFillProfile,
  AiFillSetting,
  AiOutlineArrowDown,
  AiOutlineShoppingCart,
  AiTwotoneShop,
} from "react-icons/ai";
import { LuArrowRightLeft } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
const Dropdown = ({
  user,
  logout,
  cartTotalQuantity,
  compareQuantity,
  handleStartAddNewChallenge,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex flex-col items-center  bg-white rounded-lg shadow-lg text-gray-900 hover:bg-secondary  ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full flex justify-center items-center w-7 h-7 lg:shadow-lg active:text-secondary hover:text-dim-yellow"
      >
        {!isOpen ? (
          <div className="relative">
            <AiFillProfile />
            {(cartTotalQuantity !== 0 || compareQuantity !== 0) && (
              <span
                className="absolute -top-1 -right-1 lg:h-[0.7rem]  
              lg:w-[.7rem]
              md:h-[0.5rem]
              md:w-[.5rem]
              sm:h-[0.3rem]
              sm:w-[.3rem]

               bg-red-600
               text-red-600 rounded-full border-2"
              ></span>
            )}
          </div>
        ) : (
          <MdKeyboardArrowDown />
        )}
      </button>
      {isOpen && (
        <div className="bg-white z-50 absolute top-10  flex flex-col items-start rounded-lg ">
          <div
            onClick={() => {
              setIsOpen((prev) => !prev);
              handleStartAddNewChallenge();
            }}
            className="flex flex-row w-full gap-[1vh] hover:bg-secondary text-black p-2 rounded-lg cursor-pointer "
          >
            <h2 className="flex flex-row w-full justify-between items-center ">
              <span className="flex flex-row items-center gap-[1vh]">
                <AiOutlineShoppingCart />
                Cart
              </span>
              <span className="bg-red-600 text-[2vh] rounded-full p-1 text-white">
                {cartTotalQuantity}
              </span>
            </h2>
          </div>

          <div className="flex flex-row w-full gap-[1vh] hover:bg-secondary text-black p-2 rounded-lg cursor-pointer items-center justify-center">
            <h2 className="flex flex-row justify-between items-center ">
              <span className="flex flex-row items-center gap-[1vh]">
                <LuArrowRightLeft />
                Compare
              </span>
              <span className="bg-red-600 text-[2vh] rounded-full p-1 text-white">
                {compareQuantity}
              </span>
            </h2>
          </div>
          {(user.data?.role === "admin" ||
            user.data?.role === "coolerAdmin") && (
            <div className="flex flex-row w-full gap-[1vh] hover:bg-secondary bg-primary text-black p-2 rounded-lg cursor-pointer items-center justify-center">
              <h2 className="flex flex-row justify-between items-center ">
                <span className="flex flex-row items-center gap-[1vh]">
                  <Link to="/addProduct">Add a product</Link>
                </span>
              </h2>
            </div>
          )}
          {user && (
            <div className="flex flex-row w-full gap-[1vh] hover:bg-secondary text-black p-2 rounded-lg cursor-pointer items-center justify-center">
              <h2 onClick={logout}>
                <Link>Logout</Link>
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
