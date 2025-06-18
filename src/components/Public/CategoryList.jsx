import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import paris from "../../assets/img/category/paris.jpg";
import Navbar from "../Navbar";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("gagal memuat kategori", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl p-6 mx-auto">
        {/* Search Bar */}
        <div className="px-6 py-4 ">
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full max-w-md p-2 mx-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold">Daftar Kategori</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((category) => (
              <div
                key={category.id}
                className="overflow-hidden transition bg-white rounded shadow hover:shadow-md"
              >
                <Link to={`/detailcategory/${category.id}`}>
                  {category.imageUrl && (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="object-cover w-full h-48"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = paris;
                      }}
                    />
                  )}
                </Link>
                <div className="p-4">
                  <p className="mb-2 text-lg font-semibold">{category.name}</p>
                  <Link
                    to={`/detailcategory/${category.id}`}
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
  );
};

export default CategoryList;
