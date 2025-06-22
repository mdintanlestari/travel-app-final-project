import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../../components/User/AddToCartButton";

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
    <div className="max-w-4xl px-6 py-10 mx-auto bg-white rounded-lg shadow-md">
      <img
        src={activity.imageUrls}
        alt={activity.title}
        className="object-cover w-full h-64 mb-6 rounded-md"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
        }}
      />
      <h2 className="mb-4 text-3xl font-bold text-blue-700">
        {activity.title}
      </h2>
      <p className="mb-2 text-gray-800">{activity.description}</p>
      <p className="mb-2 text-sm italic text-gray-500">{activity.price}</p>
      <p>{activity.price_discount}</p>
      <p>{activity.rating}</p>
      <p>{activity.total_reviews}</p>
      <p>{activity.facilities}</p>
      <p>{activity.address}</p>
      <p>
        {activity.province}, {activity.city}
      </p>
      <div dangerouslySetInnerHTML={{ __html: activity.location_maps }} />
      <AddToCartButton activityId={activity.id} />
    </div>
  );
};
export default ActivityDetail;
