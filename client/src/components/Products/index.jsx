import ProductCard from "../ProductCard";
import { cartActions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorBlock from "../ErrorBlock";

const Products = ({ products, home, user, error, isError }) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [cartItems, setItems] = useState([]);

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

  const addItemToCartHandler = async ({ productId, name, price, sale }) => {
    setTotal((prevStat) => (prevStat += price));
    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        `https://secrets-380318.ew.r.appspot.com/user/products/${productId}/cart`,
        { number: 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        setItems(response.data.user.cart);

        dispatch(
          cartActions.addItemToCart({
            id: productId,
            name: name,
            price: price,
            sale: sale,
            // image: productData?.images[0],
          })
        );
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add product to cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };

  if (isError) {
    return <ErrorBlock title='Something went wrong' message={error} />
  }

  return (
    <section className=" md:py-[56px] py-[37px] md:px-[121px] px-[4vh] flex flex-col gap-3 justify-center items-center">
      {home && (
        <div className="text-center">
          <h4 className="font-bold md:text-[4vh] text-[3vh]  pb-[6vh]  2xl:text-3xl  ">
            Our Products
          </h4>
        </div>
      )}
      <div className="flex flex-wrap justify-center items-start  flex-row  gap-5 ">
        {products?.map((product) => (
          <ProductCard
            key={product.title}
            product={product}
            user={user}
            addItemToCartHandler={addItemToCartHandler}
          />
        ))}
      </div>
      {home && (
        <Link
          to="/shop"
          className=" border-dim-yellow border-2 text-dim-yellow text-center
      font-semibold text-[3vh] lg:text-[3vh] 2xl:text-3xl 
      py-[2vh] px-[7vh]  mt-[4vh]
       "
        >
          See more
        </Link>
      )}

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
    </section>
  );
};

export default Products;
