import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import paris from "../../assets/img/category/paris.jpg";
import Navbar from "../Navbar";
import Footer from "../../pages/Public/Footer";

const PromoList = () => {
  const [promos, setPromos] = useState([]);
  const [searchTerm, setSeacrhTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const token = localStorage.getItem("token");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 9;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItem = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(filtered.length / itemPerPage);

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
          },
        );
        setPromos(res.data.data);
      } catch (err) {
        console.error(" Gagal memuat promo", err);
      }
    };

    fetchPromos();
  });

  useEffect(() => {
    const result = promos.filter((promo) =>
      promo.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [promos, searchTerm]);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl px-4 py-8 mx-auto mt-20">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Promo List
        </h2>
        {/* Serach Bar */}
        <div className="px-6 py-4 mb-10">
          <input
            type="text"
            placeholder="Search Promo..."
            value={searchTerm}
            onChange={(e) => setSeacrhTerm(e.target.value)}
            className="block w-full max-w-md p-2 mx-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {currentItem.length === 0 ? (
          <p className="mt-8 text-center text-gray-500">
            No matching categories found
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {currentItem.map((promo) => (
              <div
                key={promo.id}
                className="overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-white border shadow rounded-2xl hover:shadow-xl"
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
        )}
      </div>
      {/* pagination */}
      <div className=" mt-4 gap-5 flex items-center justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-slate-600 rounded hover:bg-slate-900 disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPage}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev))
          }
          disabled={currentPage === totalPage}
          className="px-4 py-2 text-white bg-slate-600 rounded hover:bg-slate-900 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default PromoList;
