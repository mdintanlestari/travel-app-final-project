import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const [activities, setactivities] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setactivities(res.data.data);
    } catch (err) {
      console.error("Gagal memuat activitas:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setCategories(res.data.data);
    } catch (err) {
      console.error("Gagal memuat activitas:", err);
    }
  };

  const fetchActivitiesByCategoryId = async (id) => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setactivities(res.data.data);
    } catch (err) {
      console.error("Gagal memuat activitas:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchActivity();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl p-6 mx-auto ">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Daftar Aktivitas
        </h2>

        <div className="grid grid-cols-2">
          <div>
            <h3>filter by category</h3>
            <label>
              <input
                type="radio"
                name="category"
                onChange={() => fetchActivity()}
              />
              All
            </label>

            {categories.map((category) => (
              <div key={category.id}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    onChange={() => fetchActivitiesByCategoryId(category.id)}
                  />{" "}
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="overflow-hidden transition bg-white rounded shadow hover:shadow-md"
              >
                <Link to={`/detailactivity/${activity.id}`}>
                  {activity.imageUrls?.[0] && (
                    <img
                      src={activity.imageUrls[0]}
                      alt={activity.title}
                      className="object-cover w-full h-48"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
                      }}
                    />
                  )}
                </Link>
                <div className="p-4">
                  <p className="mb-1 text-lg font-semibold">{activity.title}</p>
                  <p className="mb-2 text-sm text-gray-600">
                    {activity.city}, {activity.province}
                  </p>
                  <Link
                    to={`/detailactivity/${activity.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityList;
