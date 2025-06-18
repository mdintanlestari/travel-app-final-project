import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManagePromo = () => {
  const [promos, setPromos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setPromos(res.data.data);
      } catch (error) {
        console.error("Gagal mengambil data promo", error);
      }
    };
    fetchPromos();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus aktivitas ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setPromos((prevPromos) => prevPromos.filter((promo) => promo.id !== id));
      toast.success("Aktivitas berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus aktivitas", err);
      toast.error("Gagal menghapus aktivitas");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin - Daftar Promo</h2>
        <Link
          to="/admin/createpromo"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Create Promo
        </Link>
      </div>
      {promos.length === 0 ? (
        <p>Tidak ada promo.</p>
      ) : (
        promos.map((promo) => (
          <div
            key={promo.id}
            className="p-4 mb-4 bg-white border rounded shadow"
          >
            <h3 className="text-lg font-semibold">{promo.title}</h3>
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="w-56 h-40 my-2 rounded"
            />
            <div className="flex gap-4">
              <Link
                to={`/admin/updatepromo/${promo.id}`}
                className="text-blue-500 hover:underline"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(promo.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                to={`/detailpromo/${promo.id}`}
                className="text-blue-500 hover:underline"
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

export default ManagePromo;
