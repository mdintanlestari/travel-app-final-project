import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
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
        console.error("Gagal memuat kategori", err);
      }
    };

    fetchCategories();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus banner ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setCategories((prevCategories) =>
        prevCategories.filter((kategori) => kategori.id !== id)
      );
      toast.success("Kategori berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus Kategori", err);
      toast.error("Gagal menghapus Kategori");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin - Daftar Kategori</h2>
        <Link
          to="/admin/createcategory"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Create Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-600">Belum ada kategori.</p>
      ) : (
        categories.map((category) => (
          <div
            key={category.id}
            className="p-4 mb-4 bg-white border rounded shadow"
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-56 h-40 my-2 rounded"
            />
            <div className="flex gap-4">
              <Link
                to={`/admin/updatecategory/${category.id}`}
                className="text-blue-500 hover:underline"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                to={`/detailcategory/${category.id}`}
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

export default ManageCategory;
