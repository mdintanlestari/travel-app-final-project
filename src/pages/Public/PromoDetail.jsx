import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="max-w-4xl px-6 py-10 mx-auto bg-white rounded-lg shadow-md">
      <img
        src={promo.imageUrl}
        alt={promo.title}
        className="object-cover w-full h-64 mb-6 rounded-md"
      />
      <h2 className="mb-4 text-3xl font-bold text-blue-700">{promo.title}</h2>
      <p className="mb-2 text-gray-800">{promo.description}</p>
      <p className="mb-2 text-sm italic text-gray-500">
        {promo.terms_condition}
      </p>
      <div className="mt-4 space-y-1">
        <p className="text-base">
          <span className="font-semibold text-gray-600">Kode Promo:</span>{" "}
          <span className="inline-block px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
            {promo.promo_code}
          </span>
        </p>
        <p className="font-semibold text-green-600">
          Diskon: {formatRupiah(promo.promo_discount_price)}
        </p>
        <p className="text-gray-700">
          Minimum Belanja: {formatRupiah(promo.minimum_claim_price)}
        </p>
      </div>
    </div>
  );
};

export default PromoDetail;
