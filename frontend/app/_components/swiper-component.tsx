"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules"
import BarbershopItem from "./barbershop-item"



const SwiperComponent = ({ barbershops }: any) => {
  return (
    <Swiper
      slidesPerView={3.2}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      modules={[Pagination, Navigation, Mousewheel, Autoplay]}
      mousewheel={{ forceToAxis: true }}
      className="w-full"
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      style={
        {
          "--swiper-navigation-color": "#7558E7",
          "--swiper-pagination-color": "#7558E7",
          "--swiper-pagination-bottom": "-4px",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-inactive-color": "#ccc",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
        } as React.CSSProperties
      }
      breakpoints={{
        1024: {
          slidesPerView: 3.2,
        },
        768: {
          slidesPerView: 3,
        },
        0: {
          slidesPerView: 1,
        },
      }}
    >
      {barbershops.map((shop: any) => (
        <SwiperSlide key={shop.id}>
          <BarbershopItem barbershop={shop} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperComponent
