import Modal from "../Modal";
import { BsBagPlus, BsFillXCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { cartActions } from "../../store/cartSlice";

const config = {
  position: "top-center",
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: false,
  draggable: true,
  progress: undefined,
  theme: "light",
};


const CartModal = ({ onClose, isOpen }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/user/cart`;
        const { data } = await axios.get(url, { withCredentials: true });
        setCart(data.cart)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }

    }
    fetchCart()

  }, [])
  const removeItemHandler = async (productId, price) => {
    const id = toast.loading("Please wait...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/products/${productId}/cart/remove`,
        {
          number: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {

        toast.update(id, {
          render: "Product removed from cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        dispatch(cartActions.removeItemFromCart(productId));
        setCart(response.data.user.cart);
        dispatch(
          cartActions.setCart({
            items: response.data.user.cart,
            totalQuantity: response.data.user.cart
              .map((item) => item.number)
              .reduce((partialSum, a) => partialSum + a, 0),
          })
        );
      }
    } catch (err) {
      toast.update(id, {
        render: "Failed to remove product from cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-row justify-between items-center   mb-[4vh] ">
          <h3 className="h-full text-[3vh] border-b-[0.3vh] font-semibold pb-[2vh] border-gray-300 ">
            Shopping Cart
          </h3>
          <BsBagPlus />
        </div>

        <div className="flex flex-col gap-[1vh] min-h-[50vh]">
          {!loading && cart?.length !== 0 && cart?.map((item) => (
            <div
              key={item.product}
              className="flex flex-row gap-[2vh] items-center "
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded-lg "
                src={item.image.split(",")[0]}
                alt=""
              />
              <div className="">
                <h4 className="font-semibold text-[2vh]  ">{item.name}</h4>
                <p className=" text-[2vh] ">
                  {item.number} x{" "}
                  <span className="text-dim-yellow">${item.price.toFixed(2)} </span>
                </p>
              </div>
              <span className="">
                <BsFillXCircleFill onClick={() => removeItemHandler(item.product, item.price.toFixed(2)
                )} className="text-gray-400 cursor-pointer" />
              </span>
            </div>
          ))

          }
          {!loading && cart?.length === 0 && <div className="">Cart is empty</div>}
          {loading && <div className="">Loading...</div>}
        </div>

        <div className="flex pb-[2vh] flex-row gap-[2vh] items-center font-semibold text-[2vh]">
          <p>Subtotal</p>
          <p className="text-dim-yellow">
            ${cart
              .map((item) => item.price * item.number)
              .reduce((partialSum, a) => partialSum + a, 0).toFixed(2)}
          </p>
        </div>

        <div
          className="
      py-[2vh]
      border-t-[0.3vh]
      flex flex-row flex-wrap justify-evenly gap-[2vh]
      "
        >
          <Link to='/cart' onClick={onClose} className="text-[2vh] border rounded-xl px-[2.5vh] border-black  " >cart</Link>
          <Link to='/checkout' className="text-[2vh] border rounded-xl px-[2.5vh] border-black  " >checkout</Link>
          <Link to='/productComparison' className="text-[2vh] border rounded-xl px-[2.5vh] border-black  " >Comparison</Link>
        </div>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CartModal;
