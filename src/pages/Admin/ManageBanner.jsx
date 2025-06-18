import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageBanner = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBanners = async () => {
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
        setTimeout(() => {
          navigate("/admin/managebanner");
        });
      } catch (err) {
        console.error("Gagal memuat banner", err);
      }
    };

    fetchBanners();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus banner ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setBanners((prevBanners) =>
        prevBanners.filter((banner) => banner.id !== id)
      );
      toast.success("Banner berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus banner", err);
      toast.error("Gagal menghapus banner");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin - Daftar Banner</h2>
        <Link
          to="/admin/createbanner"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Create Banner
        </Link>
      </div>

      {banners.length === 0 ? (
        <p className="text-gray-600">Belum ada banner.</p>
      ) : (
        banners.map((banner) => (
          <div
            key={banner.id}
            className="p-4 mb-4 bg-white border rounded shadow"
          >
            <h3 className="text-lg font-semibold">{banner.name}</h3>
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="w-56 h-40 my-2 rounded"
            />
            <div className="flex gap-4">
              <Link
                to={`/admin/updatebanner/${banner.id}`}
                className="text-blue-500 hover:underline"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(banner.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                to={`/detailbanner/${banner.id}`}
                className="text-green-600 hover:underline"
              >
                Detail
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageBanner;
