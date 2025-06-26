import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadImage from "../UploadImage";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (url) => {
    setImageUrl(url);
    console.log("URL dari upload imgaeUrl", url);
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
        {
          name,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setMessage("Category berhasil dibuat");
      setName("");
      setImageUrl("");
      setTimeout(() => {
        navigate("/admin/managecategory");
      }, 2000);
    } catch (error) {
      console.error("gagal membuat category", error);
      setMessage(" Gagal: " + error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-200 to-gray-400">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <h1 className="mb-4 text-2xl font-bold text-center">
          Buat Kategori Baru
        </h1>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nama Category:
          </label>
          <input
            type="text"
            value={name}
            placeholder="Masukkan nama kategory"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            URL Gambar:
          </label>
          <UploadImage onUploadSuccess={handleImageUpload} />
          {imageUrl && <p>Image berhasil di-upload ke: {imageUrl}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-6 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Buat Kategori
        </button>
        {message && (
          <p className="mt-4 text-sm font-medium text-center text-green-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;
