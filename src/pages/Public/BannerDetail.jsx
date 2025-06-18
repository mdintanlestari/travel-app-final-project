import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BannerDetail = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBannerById = async () => {
      try {
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBanner(res.data.data);
      } catch (err) {
        console.error("Gagal memuat detail banner", err);
      }
    };

    fetchBannerById();
  }, [id, token]);

  return (
    <div>
      <h2>{banner.name}</h2>
      <img src={banner.imageUrl} alt={banner.name} />
      <p className="mt-4 text-center text-gray-600"></p>
    </div>
  );
};
export default BannerDetail;
