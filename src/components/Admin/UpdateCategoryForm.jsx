import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategoryForm = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          },
        );
        setName(res.data.data.name);
        setImageUrl(res.data.data.imageUrl);
      } catch (error) {
        console.error("Failed to load category data", error);
        setMessage("");
      }
    };

    fetchCategory();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`,
        {
          name,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        },
      );
      setMessage(" Category updated successfully");
      setTimeout(() => {
        navigate("/admin/managecategory");
      }, 2000);
    } catch (error) {
      console.error("Failed to update category", error);
      setMessage(
        ` Failed to update category: ${error.response?.data?.message}`,
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Update Category</h1>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Category Name</label>
          <input
            type="text"
            placeholder="Add Category"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Image URL</label>
          <input
            type="text"
            placeholder="Add Image URL"
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Update Category
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
