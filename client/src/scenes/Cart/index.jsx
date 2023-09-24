import { useEffect, useState } from "react"
import Banner from "../../components/Banner"
import axios from "axios"
import { BsFillXCircleFill } from "react-icons/bs"


const Cart = () => {

  const [cart, setCart] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/shop/cart`;
        const { data } = await axios.get(url, { withCredentials: true });
        setCart(data.cart)
        setLoading(false)
        console.log(data.cart);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }

    }
    fetchCart()

  }, [])



  return (
    <div>
      <Banner title="Cart" path={['Home', 'Cart']} />

      <div className="flex flex-col gap-[1vh] min-h-[50vh]">
        {!loading && cart?.length !== 0 && cart?.map((item) => (
          <div
            key={item.product}
            className="flex flex-row gap-[2vh] items-center "
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded-lg "
              src={`http://localhost:4000/uploads${item.image.split(",")[0]}`}
              alt=""
            />
            <div className="">
              <h4 className="font-semibold text-[2vh]  ">{item.name}</h4>
              <p className=" text-[2vh] ">
                {item.number} x{" "}
                <span className="text-dim-yellow">${item.price} </span>
              </p>
            </div>
            <span className="">
              <BsFillXCircleFill className="text-gray-400" />
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
            .reduce((partialSum, a) => partialSum + a, 0)}
        </p>
      </div>

    </div>
  )
}

export default Cart