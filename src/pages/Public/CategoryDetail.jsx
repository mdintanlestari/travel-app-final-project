import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const CategoryDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndActivities = async () => {
      try {
        // Ambil detail kategori
        const categoryRes = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(categoryRes.data.data);

        // Ambil semua aktivitas lalu filter berdasarkan categoryId
        const activityRes = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredActivities = activityRes.data.data.filter(
          (act) => act.categoryId === id
        );
        setActivities(filteredActivities);
      } catch (err) {
        console.error("Gagal memuat kategori dan aktivitas", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndActivities();
  }, [id, token]);

  if (loading || !category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="min-h-screen px-4 py-32 ">
        <div className="max-w-4xl p-6 mx-auto mb-10 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
            {category.name}
          </h2>
          <img
            src={category.imageUrl}
            alt={category.name}
            className="object-cover w-full h-64 rounded-lg"
          />
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="mb-6 text-2xl font-semibold text-gray-800">
            Aktivitas di kategori ini:
          </h3>

          {activities.length === 0 ? (
            <p className="text-gray-500">
              Belum ada aktivitas untuk kategori ini.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {activities.map((activity) => (
                <div key={activity.id} className="p-4 bg-white rounded shadow">
                  <Link to={`/detailactivity/${activity.id}`}>
                    <img
                      src={activity.imageUrls?.[0]}
                      alt={activity.title}
                      className="object-cover w-full h-48 mb-2 rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
                      }}
                    />
                  </Link>
                  <h4 className="text-lg font-semibold">{activity.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
