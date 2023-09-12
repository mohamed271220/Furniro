import Modal from "../Modal";
import { motion, useAnimate, stagger } from "framer-motion";
import { useSelector } from "react-redux";
import { BsBagPlus, BsFillXCircleFill } from "react-icons/bs";
import { useState } from "react";
const CartModal = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-row justify-between items-center   mb-[4vh] ">
        <h3 className="h-full text-[3vh] border-b-[0.3vh] font-semibold pb-[2vh] border-gray-300 ">
          Shopping Cart
        </h3>
        <BsBagPlus />
      </div>

      <div className="flex flex-col gap-[1vh] min-h-[50vh]">
        {cartItems?.map((item) => (
          <div
            key={item.productId}
            className="flex flex-row gap-[2vh] items-center "
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded-lg "
              src={`http://localhost:4000/uploads${item.image.split(",")[0]}`}
              alt=""
            />
            <div className="">
              <h4 className="font-semibold text-[2vh]  ">{item.title}</h4>
              <p className=" text-[2vh] ">
                {item.number} x{" "}
                <span className="text-dim-yellow">${item.totalPrice} </span>
              </p>
            </div>
            <span className="">
              <BsFillXCircleFill className="text-gray-400" />
            </span>
          </div>
        ))}
      </div>

      <div className="flex pb-[2vh] flex-row gap-[2vh] items-center font-semibold text-[2vh]">
        <p>Subtotal</p>
        <p className="text-dim-yellow">
          ${cartItems
            .map((item) => item.totalPrice * item.number)
            .reduce((partialSum, a) => partialSum + a, 0)}
        </p>
      </div>

      <div
      className="
      py-[2vh]
      border-t-[0.3vh]
      flex flex-row flex-wrap justify-evenly gap-[2vh]
      "
      >

<button className="text-[2vh] border rounded-xl px-[2.5vh] border-black  " >cart</button>
<button className="text-[2vh] border rounded-xl px-[2.5vh] border-black  " >checkout</button>
<button className="text-[2vh] border rounded-xl px-[2.5vh] border-black  " >Comparison</button>

      </div>
    </Modal>
  );
};

export default CartModal;
