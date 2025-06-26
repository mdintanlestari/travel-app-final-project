import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImage from "../UploadImage";

const ActivityForm = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrls: [],
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    categoryId: "",
  });

  const token = localStorage.getItem("token");

  const handleImageUpload = (url) => {
    setImageUrl(url);
    console.log("URL dari upload imageUrl", url);

    setFormData((prev) => ({
      ...prev,
      imageUrls: [url],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData);
    const payload = {
      ...formData,
      price: Number(formData.price),
      price_discount: Number(formData.price_discount),
      rating: Number(formData.rating),
      total_reviews: Number(formData.total_reviews),
    };

    try {
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Activity berhasil dibuat");

      // reset form
      setFormData({
        title: "",
        description: "",
        imageUrls: [formData.imageUrls],
        price: "",
        price_discount: "",
        rating: "",
        total_reviews: "",
        facilities: "",
        address: "",
        city: "",
        location_maps: "",
        categoryId: "",
      });

      setTimeout(() => {
        navigate("/admin/manageactivity");
      });
    } catch (err) {
      console.error("Gagal membuat aktivitas", err);
      toast.error("Gagal membuat aktivitas: " + err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-white rounded shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Create Activity
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Nama Aktivitas</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan nama aktivitas"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Harga</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Masukkan harga"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Harga Diskon</label>
          <input
            type="text"
            name="price_discount"
            value={formData.price_discount}
            onChange={handleChange}
            placeholder="Masukkan diskon"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Rating</label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Total Reviews</label>
          <input
            type="text"
            name="total_reviews"
            value={formData.total_reviews}
            onChange={handleChange}
            placeholder="Masukkan reviews"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Fasilitas</label>
          <input
            type="text"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            placeholder="Masukkan fasilitas"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Alamat</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Masukkan alamat"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Provinsi</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Masukkan provinsi"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Kota</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Masukkan kota"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* LOCATION MAPS */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Lokasi (Google Maps)</label>
          <input
            type="text"
            name="location_maps"
            value={formData.location_maps}
            onChange={handleChange}
            placeholder="Masukkan nama tempat / lokasi"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Id kategory</label>
          <input
            type="text"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="Masukkan id kategory"
            className="w-full p-2 border rounded"
            required
          />
          <UploadImage onUploadSuccess={handleImageUpload} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="object-cover w-full h-48 mt-2 rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Image+Error";
              }}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-6 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Buat Activity
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
