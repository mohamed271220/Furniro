import { useParams } from "react-router-dom";

import { getProductById } from "../../constants/Http";
import Skeleton from "../../constants/Loading/SkeletonTwo/Skeleton";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { AiFillStar } from "react-icons/ai";
import { compareActions } from "../../store/compareSlice";
import Details from '../../components/Details'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import "./index.css"
const Product = ({ user }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [mainImage, setMainImage] = useState();
  const [total, setTotal] = useState(0);

  const [cartItems, setItems] = useState([]);


  const product1Id = useSelector(state => state.compare.itemOneId)
  const product2Id = useSelector(state => state.compare.itemTwoId)

  const compareHandler = (id) => {

    if (product1Id && product2Id) {
      dispatch(compareActions.swapItemOneCompare(id))
    } else {
      dispatch(compareActions.addItemToCompare(id))
    }

  }

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
        `http://localhost:4000/user/products/${productId}/cart`,
        { number: 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response) {
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        // console.log(productData);
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
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: ({ signal }) => getProductById({ signal, id }),

  })

  useEffect(() => {
    if (data && data.images && data.images.length > 0) {
      setMainImage(data.images[0]);
    }
  }, [data]);


  if (isPending) {
    return <Skeleton type={'menu'} />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="bg-secondary flex flex-row text-[2vh] items-center justify-start gap-[2vh] p-5 md:p-[4vh]">
        <span>Home</span> <span>{">"}</span>
        <span>Shop</span> <span>{">"}</span>
        <span className="text-gray-500">{data.title}</span>
      </div>
      <div className="product flex flex-col gap-2 ">
        <div className="info w-full md:px-9 px-4 gap-4 py-[2vh] flex md:flex-row flex-col ">
          {/* images  */}
          <div className="md:mx-0 mx-auto flex lg:flex-row flex-col-reverse gap-[2vh] w-full md:w-[50%]">
            <div className=" relative flex flex-row lg:flex-col gap-[2vh] md:h-[60vh] md:pr-2 overflow-auto custom-scrollbar">
              {data.images.map((image, i) => (
                <img key={i} className={`w-[10vh] h-[10vh] rounded-lg ${image === mainImage ? 'border-2 border-dim-yellow' : ''}`} src={image} alt="" onClick={() => setMainImage(image)} />
              ))}
            </div>
            <img className="md:w-[85%] md:h-[60vh] rounded-lg" src={mainImage} alt="" />
          </div>
          {/* details */}
          <div className="flex flex-col w-full md:w-[40%]">
            <h2 className="text-[6vh]">{data.title}</h2>
            <h2 className="text-[2vh]">{data.shortDescription}</h2>
            <h3 className="text-[4vh] text-gray-500">{(data.price - data.price * (data.sale / 100)).toFixed(2)}$
            {data.sale && <span className="text-[1.5vh] m-0 ml-1 text-red-400 font-semibold"> sale:{data.sale}%
              </span>}
            </h3>
            {data.sale && <p className="text-[1.7vh]">
              <s>$ {(data.price).toFixed()}</s>
            </p>}
            <div className="text-[2.5vh] flex flex-row items-center"><AiFillStar className="text-dim-yellow" /> | {data.rating}</div>
            <p className="text-[2vh]">{data.ShortDescription}</p>

            <div className="flex flex-col gap-2 text-[2.1vh] mt-[1vh]">
              <p className="text-gray-500">size</p>
              <div className="flex flex-row gap-2">
                {data.sizeOptions.map((size) => (
                  <span className="bg-secondary m-0 p-[1vh] rounded-sm" key={size}>
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* cart control  */}

            <div className="flex flex-row items-center  text-[3vh] gap-[3vh] mt-[3vh]">
              {
                user && (
                  <div className="btn-3  hover:py-[1.5vh] hover:px-[7vh] hover:rounded-[5px]">
                    <button onClick={(e) => {
                      e.preventDefault();
                      addItemToCartHandler({
                        productId: data._id,
                        name: data.title,
                        price: data.price,
                        sale: data.sale
                      });

                    }}>Add To Cart</button>
                  </div>
                )
              }
              <div className="btn-3 bg-primary hover:py-[1.5vh] hover:px-[7vh] hover:rounded-[5px]">
                <button onClick={() => {
                  compareHandler({ id: data._id })
                }}>+ Compare</button>{" "}
              </div>
            </div>

          </div>
        </div>
        <hr />
        <Details data={data} />
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
  );
};

export default Product;
