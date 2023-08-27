import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { EffectCards } from "swiper";
import Ex from "../../../assets/images/Ex.png";
import "./index.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Line from "../../../assets/icons/Line";
function SwiperComp() {
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
        <SwiperSlide className="relative">
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="bg-black z-50 absolute h-54 w-45">
                  Current slide is
                </div>
              )}
              <img src={Ex} alt="slide_image" />
            </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
              <div className="absolute flex flex-row gap-0">
                <div className="box">
                  <p>
                    01 <Line /> Bed Room{" "}
                  </p>
                  <p>Inner Peace</p>
                </div>
                <div className="box">
                  <AiOutlineArrowRight />
                </div>
              </div>
              <img src={Ex} alt="slide_image" />
            </>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <>
              <img src={Ex} alt="slide_image" />
            </>
          )}
        </SwiperSlide>

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
