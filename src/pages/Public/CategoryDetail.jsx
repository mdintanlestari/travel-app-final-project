import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(res.data.data);
      } catch (err) {
        console.error("Gagal memuat detail kategori", err);
      }
    };

    fetchCategoryById();
  }, [id, token]);

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          {category.name}
        </h2>
        <img
          src={category.imageUrl}
          alt={category.name}
          className="object-cover w-full h-64 rounded-md shadow-sm"
          onError={(e) => {
            e.target.src = "/fallback-image.png";
          }}
        />

        <p className="mt-4 text-center text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae autem
          magnam nulla nemo enim delectus, deserunt, tenetur ipsum facilis saepe
          totam qui praesentium. Deserunt mollitia quia sit at natus corrupti
          repellat autem pariatur laudantium amet vel eligendi facilis,
          assumenda unde odit voluptatum nostrum culpa molestias laborum
          inventore sequi quos aliquam.
        </p>
      </div>
    </div>
  );
};

export default CategoryDetail;
