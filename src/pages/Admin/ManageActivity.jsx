import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageActivity = () => {
  const [actitivies, setActivities] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActivities(res.data.data);
      } catch (err) {
        console.error("Gagal memuat Aktivitas", err);
      }
    };

    fetchActivities();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus aktivitas ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== id)
      );
      toast.success("Aktivitas berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus aktivitas", err);
      toast.error("Gagal menghapus aktivitas");
    }
  };

  return (
    <div>
      <div className="max-w-4xl p-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin - Daftar Aktivitas</h2>
          <Link
            to="/admin/createactivity"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            + Create Activity
          </Link>
        </div>

        {actitivies.length === 0 ? (
          <p className="text-gray-600">Belum ada aktivitas.</p>
        ) : (
          actitivies.map((activity) => (
            <div
              key={activity.id}
              className="p-4 mb-4 bg-white border rounded shadow"
            >
              <h3 className="text-lg font-semibold">{activity.title}</h3>
              <img
                src={activity.imageUrls}
                alt={activity.name}
                className="w-56 h-40 my-2 rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
                }}
              />
              <div className="flex gap-4">
                <Link
                  to={`/admin/updateactivity/${activity.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
                <Link
                  to={`/detailactivity/${activity.id}`}
                  className="text-green-600 hover:underline"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageActivity;
