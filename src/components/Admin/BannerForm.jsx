import axios from "axios";
import { useState } from "react";

const BannerForm = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
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
      setMessage("Banner berhasil dibuat");
      setName("");
      setImageUrl("");
    } catch (error) {
      console.error("gagal membuat banner", error);
      setMessage(" Gagal: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-200 to-gray-400">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <h1 className="mb-4 text-2xl font-bold text-center">
          Buat Banner Baru
        </h1>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nama Banner:
          </label>
          <input
            type="text"
            value={name}
            placeholder="Masukkan nama banner"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            URL Gambar:
          </label>
          <input
            type="text"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Buat Banner
        </button>

        {message && (
          <p className="mt-4 text-sm font-medium text-center text-gray-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default BannerForm;
