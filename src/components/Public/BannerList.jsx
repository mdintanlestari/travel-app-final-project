import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBanners(res.data.data);
      } catch (err) {
        console.error("gagal memuat banner", err);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl p-6 mx-auto">
        <h2 className="mb-4 text-2xl font-bold">Daftar Banner</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="overflow-hidden transition bg-white rounded shadow hover:shadow-md"
            >
              <Link to={`/detailbanner/${banner.id}`}>
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="object-cover w-full h-48"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.png";
                  }}
                />
              </Link>
              <div className="p-4">
                <p className="mb-2 text-lg font-semibold">{banner.name}</p>
                <Link
                  to={`/detailbanner/${banner.id}`}
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

export default BannerList;
