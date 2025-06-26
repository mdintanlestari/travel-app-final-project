import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Footer from "../../pages/Public/Footer";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirtsItem = indexOfLastItem - itemPerPage;
  const currentItem = filteredActivities.slice(
    indexOfFirtsItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredActivities.length / itemPerPage);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
    fetchActivity();
  }, []);

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
      setActivities(res.data.data);
      setFilteredActivities(res.data.data);
    } catch (err) {
      console.error("Gagal memuat aktivitas:", err);
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
      console.error("Gagal memuat kategori:", err);
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
      setActivities(res.data.data);
      setFilteredActivities(res.data.data);
      setSearchTerm("");
    } catch (err) {
      console.error("Gagal memuat aktivitas:", err);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = activities.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
    setFilteredActivities(filtered);
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="max-w-6xl p-6 mx-auto mt-20">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Daftar Aktivitas
          </h2>

          {/* Search Bar */}
          <div className="flex items-end justify-end mb-4 mt-14">
            <input
              type="text"
              placeholder="Cari aktivitas..."
              className="w-[60vh] px-4 py-2 border border-black rounded  shadow-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Filter by category */}
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Filter by Category:</h3>
            <select
              className="px-4 py-2 border rounded"
              onChange={(e) => {
                const selectedCategoryId = e.target.value;
                if (selectedCategoryId === "") {
                  fetchActivity(); // ambil semua activity
                } else {
                  fetchActivitiesByCategoryId(selectedCategoryId); // ambil sesuai kategori
                }
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Grid */}
          {currentItem.length === 0 ? (
            <p className="mt-8 text-center text-gray-500">
              Aktivitas yang dicari tidak tersedia.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {currentItem.map((activity) => (
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
                    <p className="mb-1 text-lg font-semibold">
                      {activity.title}
                    </p>
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
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-900 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-900 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActivityList;
