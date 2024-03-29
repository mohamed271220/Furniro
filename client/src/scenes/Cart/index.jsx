import { useEffect, useState } from "react"
import Banner from "../../components/Banner"
import axios from "axios"
import { BsTrashFill } from "react-icons/bs"
import { cartActions } from "../../store/cartSlice"
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"

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

const Cart = () => {

  const [cart, setCart] = useState([])

  const [loading, setLoading] = useState(false)

  const [total, setTotal] = useState(0);

  const dispatch = useDispatch()



  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/user/cart`;
        const { data } = await axios.get(url, { withCredentials: true });
        setCart(data.cart)
        setLoading(false)
        setTotal(data.cart
          .map((item) => item.price * item.number)
          .reduce((partialSum, a) => partialSum + a, 0))
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
        setTotal((prevStat) => (prevStat -= price));
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
    <div>
      <Banner title="Cart" path={['Home', 'Cart']} />

      <div className=" flex flex-col md:flex-row justify-center w-full p-[5vh] gap-[2vh]">

        <div className="flex flex-col w-full md:w-[60%] gap-[2vh]">

          <h1 className=" text-center p-[1vh] text-semibold md:text-[3vh] text-[2.5vh] w-full bg-primary"> Product in cart </h1>

          <div className="flex flex-col gap-[1vh] w-full">
            {!loading && cart?.length !== 0 && cart?.map((item) => (
              <div
                key={item.product}
                className="flex flex-row gap-[1vh] items-center w-full justify-between"
              >
                <img
                  className="w-[10vh] h-[10vh] object-cover rounded-lg "
                  src={item.image.split(",")[0]}
                  alt=""
                />

                <h4 className="font-semibold text-[2vh] w-[25%]  ">{item.name}</h4>
                <p className=" text-[2vh] ">
                  <span className="border-2 p-[1vh] w-[4vh] h-[4vh] rounded-full shadow-sm" >{item.number}</span>
                  <span className="text-dim-yellow">${item.price.toFixed(2)} </span>
                </p>

                <span className=" cursor-pointer" onClick={() => removeItemHandler(item.product, item.price)}>
                  <BsTrashFill className="text-dim-yellow" />
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
              ${total.toFixed(2)}
            </p>
          </div>

        </div>

        <div className="bg-primary flex flex-col p-[3vh] justify-between text-[1.5vh] md:text-[2vh]  items-center rounded-lg md:w-[30%] gap-[2vh] text-center">


          <h2 className="font-semibold text-center">Cart total</h2>

          <p className="text-dim-yellow text-center"><span className="text-black m-0">Total : </span>${total.toFixed(2)}</p>


          <Link to="/checkout">
            <button
              className="
          bg-dim-yellow   border-0  mt-4  cursor-pointer transition-all duration-200 ease-in-out block hover:filter hover:contrast-115 active:transform active:scale-98 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed
          text-primary font-semibold py-[1.5vh] px-[4vh] rounded-lg" disabled={cart?.length === 0}>
              Checkout
            </button>
          </Link>
        </div>
      </div>

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
    </div>
  )
}

export default Cart