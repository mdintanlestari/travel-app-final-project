import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const PromoDetail = () => {
  const { id } = useParams();
  const [promo, setPromo] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPromoById = async () => {
      try {
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPromo(res.data.data);
      } catch (err) {
        console.error("Gagal memuat detail promo", err);
      }
    };

    fetchPromoById();
  }, [id, token]);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  if (!promo) {
    return <p className="py-8 text-center">Loading promo...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl px-4 py-8 mx-auto bg-white rounded-md shadow-md">
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="object-cover w-full h-64 mb-6 rounded-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
          }}
        />

        <h1 className="mb-3 text-2xl font-bold text-blue-800 md:text-3xl">
          {promo.title}
        </h1>

        <p className="mb-4 text-gray-700">{promo.description}</p>

        {promo.terms_condition && (
          <div className="p-4 mb-6 text-sm text-gray-700 bg-gray-100 rounded-md">
            <p className="mb-1 font-semibold text-gray-600">
              Syarat & Ketentuan:
            </p>
            <p>{promo.terms_condition}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Kode Promo</p>
            <p className="inline-block px-3 py-1 mt-1 font-semibold text-blue-800 bg-blue-100 rounded-md">
              {promo.promo_code}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Diskon</p>
            <p className="mt-1 font-semibold text-green-700">
              {formatRupiah(promo.promo_discount_price)}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Minimum Belanja</p>
            <p className="mt-1 text-gray-800">
              {formatRupiah(promo.minimum_claim_price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoDetail;
