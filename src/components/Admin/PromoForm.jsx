import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImage from "../UploadImage";

const PromoForm = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
  });

  const token = localStorage.getItem("token");
  const handleImageUpload = (url) => {
    setImageUrl(url);
    console.log("Uploaded Image URL", url);
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

    try {
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
        {
          ...formData,
          promo_discount_price: Number(formData.promo_discount_price),
          minimum_claim_price: Number(formData.minimum_claim_price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        },
      );

      toast.success("Successfully created promo");

      // reset form
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        terms_condition: "",
        promo_code: "",
        promo_discount_price: "",
        minimum_claim_price: "",
      });

      setTimeout(() => {
        navigate("/admin/managepromo");
      }, 2000);
    } catch (err) {
      console.error("Failed to create promo", err);
      toast.error("Failed to create promo: " + err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-white rounded shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Create Promo
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Promo Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Add Promo Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add Description"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Term and Condition</label>
          <textarea
            name="terms_condition"
            value={formData.terms_condition}
            onChange={handleChange}
            placeholder="Write here"
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Promo Code</label>
          <input
            type="text"
            name="promo_code"
            value={formData.promo_code}
            onChange={handleChange}
            placeholder="Add Promo Code"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Discount Amount (Rp)</label>
          <input
            type="number"
            name="promo_discount_price"
            value={formData.promo_discount_price}
            onChange={handleChange}
            placeholder="Add Amount"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Minimum Purchase (Rp)
          </label>
          <input
            type="number"
            name="minimum_claim_price"
            value={formData.minimum_claim_price}
            onChange={handleChange}
            placeholder="Add Amount"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <UploadImage onUploadSuccess={handleImageUpload} />
          {imageUrl && <p>Image successfully uploaded to: {imageUrl}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Promo
        </button>
      </form>
    </div>
  );
};

export default PromoForm;
