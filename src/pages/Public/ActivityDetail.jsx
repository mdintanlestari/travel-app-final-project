import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../../components/User/AddToCartButton";
import Navbar from "../../components/Navbar";
import Footer from "./Footer";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchActivityById = async () => {
      try {
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActivity(res.data.data);
      } catch (err) {
        console.error("Gagal memuat detail Aktivitas", err);
      }
    };

    fetchActivityById();
  }, [id, token]);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  if (!activity) {
    return <p className="py-8 text-center">Loading activity...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl px-4 py-8 mx-auto mt-32 bg-white rounded-md shadow-md">
        <div className="mb-6">
          <img
            src={activity.imageUrls}
            alt={activity.title}
            className="object-cover w-full h-64 rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
            }}
          />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-blue-800 md:text-3xl">
          {activity.title}
        </h1>

        <p className="mb-4 text-gray-700">{activity.description}</p>

        <div className="grid gap-4 mb-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Harga</p>
            <p className="text-lg font-semibold text-green-700">
              {formatRupiah(activity.price)}
            </p>
          </div>

          {activity.price_discount && (
            <div>
              <p className="text-sm text-gray-500">Diskon</p>
              <p className="text-lg font-semibold text-red-600">
                {formatRupiah(activity.price_discount)}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-medium">{activity.rating} ⭐</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Review</p>
            <p className="font-medium">{activity.total_reviews}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Fasilitas</p>
            <p className="text-gray-700">{activity.facilities}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="text-gray-700">{activity.address}</p>
            <p className="text-gray-700">
              {activity.city}, {activity.province}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-sm text-gray-500">Lokasi Peta</p>
          <div className="overflow-hidden rounded shadow-md">
            <div
              className="w-full h-64"
              dangerouslySetInnerHTML={{ __html: activity.location_maps }}
            />
          </div>
        </div>

        <AddToCartButton activityId={activity.id} />
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetail;
