import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategorySwiper = ({ categories }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <div className="relative mx-10 mt-20">
      {/* Tombol panah global */}
      <button
        ref={prevRef}
        className="absolute z-10 p-2 text-white -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-opacity-80"
      >
        <FaChevronLeft />
      </button>
      <button
        ref={nextRef}
        className="absolute z-10 p-2 text-white -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-opacity-80"
      >
        <FaChevronRight />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/detailcategory/${category.id}`}>
              <div className="relative group overflow-hidden h-[60vh] ">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <h2 className="text-2xl font-bold text-white">
                    {category.name}
                  </h2>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySwiper;
