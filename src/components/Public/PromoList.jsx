import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import paris from "../../assets/img/category/paris.jpg";
import Navbar from "../Navbar";

const PromoList = () => {
  const [promos, setPromos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPromos(res.data.data);
      } catch (err) {
        console.error(" Gagal memuat promo", err);
      }
    };

    fetchPromos();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Daftar Promo
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="overflow-hidden transition duration-300 bg-white border shadow rounded-2xl hover:shadow-xl"
            >
              <Link to={`/detailpromo/${promo.id}`}>
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="object-cover w-full h-48"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = paris;
                  }}
                />
              </Link>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-blue-600">
                  {promo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoList;
