import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CategorySwiper from "../../components/Public/CategorySwiper";
import Footer from "./Footer";
import ClientReviews from "../../components/Public/ClientReview";

const LandingPage = () => {
  const [promos, setPromos] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
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
        }
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
        }
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
        }
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
  }, []);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

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

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white pointer-events-none">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl drop-shadow-lg">
            Traveller For Life.
          </h1>
          <p className="mb-8 text-lg md:text-xl drop-shadow-md">
            Live your best moments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-10 mx-6 mt-12 text-gray-700 bg-white border border-white shadow md:grid-cols-3 py-14 rounded-xl">
        {/* ITEM 1 */}
        <div className="flex items-start gap-4">
          <FontAwesomeIcon
            icon={faGlobe}
            className="w-12 h-12 text-green-600"
          />
          <div>
            <h2 className="mb-1 text-lg font-bold">Best Destination</h2>
            <p className="text-sm">
              Find out what the best destination in the world are as awarded by
              millions.
            </p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="flex items-start gap-4">
          <FontAwesomeIcon
            icon={faPercent}
            className="w-12 h-12 text-green-600"
          />
          <div>
            <h2 className="mb-1 text-lg font-bold">Best Price Guaranteed</h2>
            <p className="text-sm">
              We constantly ensure to have the lowest prices available online
              and it's our commitment.
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="flex items-start gap-4">
          <FontAwesomeIcon
            icon={faClock}
            className="w-12 h-12 text-green-600"
          />
          <div>
            <h2 className="mb-1 text-lg font-bold">Instant Booking</h2>
            <p className="text-sm">
              With our fast booking option, you can book public tours and pay
              instantly.
            </p>
          </div>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <CategorySwiper categories={categories} />

      {/* PROMO SECTION */}
      <div className="pt-20 mx-10">
        <h1 className="mb-6 text-2xl font-bold">Promos</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {promos.slice(0, 4).map((promo) => (
            <div
              key={promo.id}
              className="object-cover w-full p-2 transition-transform duration-300 bg-white rounded shadow hover:scale-105"
            >
              <Link to={`/detailpromo/${promo.id}`}>
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="object-cover w-full h-40 "
                />
              </Link>
              <h2 className="mt-2 text-lg font-semibold">{promo.title}</h2>
              <p className="text-sm font-bold text-green-600">
                Discount: {formatRupiah(promo.promo_discount_price)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            to={"/promo"}
            className="inline-block px-6 py-2 text-white transition bg-green-400 rounded hover:bg-green-700"
          >
            See More Promo
          </Link>
        </div>
      </div>

      {/* ACTIVITY SECTION */}
      <div className="pt-20 mx-10">
        <h1 className="mb-6 text-2xl font-bold">Best Activity</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {activities.slice(0, 4).map((activity) => (
            <div
              key={activity.id}
              className="object-cover w-full p-2 transition-transform duration-300 bg-white rounded shadow hover:scale-105"
            >
              <Link to={`/detailactivity/${activity.id}`}>
                <img
                  src={activity.imageUrls}
                  alt={activity.title}
                  className="object-cover w-full h-40 "
                />
              </Link>
              <h2 className="mt-2 text-lg font-semibold">{activity.title}</h2>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            to={"/activity"}
            className="inline-block px-6 py-2 text-white transition bg-green-400 rounded hover:bg-green-700"
          >
            See More Activity
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
