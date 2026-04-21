import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPercent, faClock } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CategorySwiper from "../../components/Public/CategorySwiper";
import Footer from "./Footer";
import ClientReviews from "../../components/Public/ClientReview";
import useOnLoad from "../../hooks/useOnLoad";
import useInViewOnce from "../../hooks/useInViewOnce";

const LandingPage = () => {
  const [promos, setPromos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const token = localStorage.getItem("token");

  const show = useOnLoad();

  const trust = useInViewOnce();
  const category = useInViewOnce();
  const promo = useInViewOnce();
  const activity = useInViewOnce();

  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setBanners(res.data.data);
    } catch (err) {
      console.error("Gagal memuat banner", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setActivities(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil aktivitas:", error);
    }
  };

  const fetchPromos = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPromos(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil promo:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchPromos();
    fetchCategories();
    fetchActivities();
  });

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[100vh] overflow-hidden">
        <Swiper
          key={banners.length}
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          speed={2000}
          loop={banners.length > 1}
          className="w-full h-full"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
          className={`absolute mt-20 inset-0 z-10 flex flex-col  items-center justify-center px-4 text-center
             text-white pointer-events-none `}
        >
          <div
            className={`transition-all duration-1000
           ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} max-w-4xl`}
          >
            <h1
              className={` tracking-widest mb-4 text-4xl  font-bold md:text-7xl drop-shadow-lg `}
            >
              Discover the World’s Most Breathtaking Destinations
            </h1>
            <p className="mb-8 text-lg md:text-xl drop-shadow-md mx-10">
              From hidden gems to iconic landmarks — we craft journeys that
              become lifelong stories. Luxury travel, reimagined for the modern
              explorer.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={trust.ref}
        className={`px-6 mx-auto py-32 text-gray-700 bg-[#1A2332] `}
      >
        <p className="text-center text-yellow-600 text-lg">
          WHY TRAVELERS CHOOSE US
        </p>
        <h2 className="text-white text-center text-5xl mt-3">
          Trusted by Thousands
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-white transition-all duration-1000
          ${trust.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          {/* ITEM 1 */}
          <div
            className=" flex flex-col items-center justify-center gap-4 bg-white/30 border hover:border-yellow-500 shadow  p-14 rounded-lg
            transition-all duration-500 transform hover:-translate-y-5 hover:shadow-xl "
          >
            <FontAwesomeIcon icon={faGlobe} className="w-12 h-12  text-white" />
            <div className="text-center">
              <h2 className="mb-1 text-lg font-bold">Best Destination</h2>
              <p className="text-sm ">
                Find out what the best destination in the world are as awarded
                by millions.
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div
            className={`flex flex-col items-center justify-center gap-4 bg-white/30 border hover:border-yellow-500  shadow  p-14 rounded-lg
            transition-all duration-500 transform hover:-translate-y-5 hover:shadow-xl  `}
          >
            <FontAwesomeIcon
              icon={faPercent}
              className="w-12 h-12 text-white"
            />
            <div className="text-center">
              <h2 className="mb-1 text-lg font-bold">Best Price Guaranteed</h2>
              <p className="text-sm">
                We constantly ensure to have the lowest prices available online
                and it's our commitment.
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div
            className="flex flex-col items-center justify-center gap-4 bg-white/30 border hover:border-yellow-500  shadow  p-14 rounded-lg
            transition-all duration-500 transform hover:-translate-y-5 hover:shadow-xl  "
          >
            <FontAwesomeIcon icon={faClock} className="w-12 h-12 text-white" />
            <div className="text-center">
              <h2 className="mb-1 text-lg font-bold">Instant Booking</h2>
              <p className="text-sm">
                With our fast booking option, you can book public tours and pay
                instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="px-4 md:px-10">
        <h2 className="mt-20 -mb-16 ml-10 text-2xl font-bold">
          Explore Beautiful Destinations
        </h2>
        <div
          ref={category.ref}
          className={` transition-all duration-1000 
            ${category.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <CategorySwiper categories={categories} />
        </div>
      </div>

      {/* PROMO SECTION */}
      <div className={`px-4 mt-10 pt-20 md:px-20 `}>
        <h1 className="mb-6 text-2xl font-bold">
          Best deals for a price-less travel!
        </h1>
        <div
          ref={promo.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 md:gap-5 gap-7 md:grid-cols-3 lg:grid-cols-4 transition-all duration-1000
            ${promo.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          {promos.slice(0, 4).map((promo) => (
            <div
              key={promo.id}
              className="object-cover w-full  h-[300px] shadow-xl  transition-transform duration-300 bg-white rounded-xl  hover:scale-105"
            >
              <Link to={`/detailpromo/${promo.id}`}>
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="object-cover rounded-t-lg w-full h-[200px] "
                />
              </Link>
              <div className="px-3 mt-5">
                <h2 className="mt-2 text-lg font-semibold">{promo.title}</h2>
                <p className="text-sm font-bold text-slate-400">
                  Discount: {formatRupiah(promo.promo_discount_price)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right mr-8">
          <Link
            to={"/promo"}
            className="inline-block px-6 py-2 text-white transition rounded-2xl bg-slate-400  hover:bg-slate-700"
          >
            See More
          </Link>
        </div>
      </div>

      {/* ACTIVITY SECTION */}
      <div className="mx-10 pt-16 md:px-10">
        <h1 className="mb-6 text-2xl font-bold">
          Our Most Popular Experiences
        </h1>
        <div
          ref={activity.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 transition-all duration-1000
         ${activity.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          {activities.slice(3, 7).map((activity) => (
            <div
              key={activity.id}
              className="object-cover w-full h-[260px]  transition-transform duration-300 bg-white rounded-xl shadow-lg hover:scale-105"
            >
              <Link to={`/detailactivity/${activity.id}`}>
                <img
                  src={activity.imageUrls}
                  alt={activity.title}
                  className="object-cover w-full h-[200px] rounded-t-xl "
                />
              </Link>
              <h2 className="mt-2 text-lg font-semibold pl-4 text-center">
                {activity.title}
              </h2>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            to={"/activity"}
            className="inline-block px-6 py-2 mr-4 text-white transition rounded-2xl bg-slate-400  hover:bg-slate-700"
          >
            See More
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <ClientReviews />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
