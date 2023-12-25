import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./index.css";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Line from "../../../assets/icons/Line";

import { Link, useNavigate } from "react-router-dom";
function SwiperComp({ products }) {
  const navigate = useNavigate()
  console.log(products);
  return (
    <div className="container ">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        // pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[
          //   EffectCards,

          EffectCoverflow,
          Pagination,
          Navigation,
        ]}
        className="swiper_container"
      >
        {products.map((product, index) => (
          <SwiperSlide className="relative" key={product._id}>
            {({ isActive }) => (
              <Link to={`/product/${product._id}`}>
                {isActive && (
                  <div
                    className="absolute bottom-[10%] left-[9%] flex flex-row items-end gap-0"
                    onClick={() => {
                      navigate();
                    }}
                  >
                    <div className="box flex bg-white bg-opacity-75 p-[5vh] flex-col items-center">
                      <p className="flex flex-row items-center justify-start">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1} <Line /> {product.title}{" "}
                      </p>
                      <p className="font-semibold text-[3vh]">Inner Peace</p>
                    </div>
                    <div className="box bg-dim-yellow p-[1vh] text-white">
                      <AiOutlineArrowRight size="4vh" />
                    </div>
                  </div>
                )}
                <img src={product.images[0]} alt="slide_image" />
              </Link>
            )}
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <AiOutlineArrowLeft />
          </div>
          <div className="swiper-button-next slider-arrow">
            <AiOutlineArrowRight />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SwiperComp;
