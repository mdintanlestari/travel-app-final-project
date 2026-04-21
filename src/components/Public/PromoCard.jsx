import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PromoCard() {
  const [promos, setPromos] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPromos = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPromos(res.data.data);
    } catch (error) {
      console.error("gagal ambil promo: ", error);
    }
  };
  useEffect(() => {
    fetchPromos();
  }, []);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  return (
    <div className={`px-4 mt-10 pt-20 md:px-20 `}>
      <h1 className="mb-6 text-2xl font-bold">
        Best deals for a price-less travel
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-5 gap-7 md:grid-cols-3 lg:grid-cols-4">
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
  );
}

export default PromoCard;
