import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import paris from "../../assets/img/category/paris.jpg";
import Navbar from "../Navbar";
import Footer from "../../pages/Public/Footer";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const token = localStorage.getItem("token");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredCategories.length / itemPerPage);

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
          },
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const result = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCategories(result);
    setCurrentPage(1);
  }, [categories, searchTerm]);

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl p-6 mx-auto mt-20">
        {/* Search Bar */}
        <div className="px-6 py-4 ">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full max-w-md p-2 mx-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold">Category List</h2>
        {/* Categories Grid */}
        {currentItem.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">
            No matching categories found
          </p>
        ) : (
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3`}
          >
            {currentItem.map((category) => (
              <div
                key={category.id}
                className="overflow-hidden transition-all duration-300 transform hover:-translate-y-2 bg-white rounded shadow hover:shadow-lg "
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
                    See Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className=" mt-4 gap-5 flex items-center justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-slate-600 rounded hover:bg-slate-900 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-slate-600 rounded hover:bg-slate-900 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryList;
