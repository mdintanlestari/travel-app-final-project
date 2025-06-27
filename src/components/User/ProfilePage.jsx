import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UploadImage from "../UploadImage";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setUser(res.data.data);
    } catch (err) {
      setError("Gagal mengambil data user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const payload = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePictureUrl: imageUrl,
    };

    try {
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Profil berhasil diupdate!");
      navigate("/profile");
    } catch (err) {
      toast.error("Gagal update profil");
    }
  };

  const handleImageUpload = (url) => {
    setImageUrl(url);
  };

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-xl px-6 py-10 mx-auto mt-12 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-600">
          Profil {user.role === "admin" ? "Admin" : "User"}
        </h2>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Nama</label>
            <input
              type="text"
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="masukkan nama"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="masukkan email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">No HP</label>
            <input
              type="text"
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="masukkan nomor hp"
            />
          </div>

          <UploadImage onUploadSuccess={handleImageUpload} />
          {imageUrl && (
            <div className="mt-2 text-sm text-gray-600">
              Image berhasil di-upload:
              <div className="break-all">{imageUrl}</div>
            </div>
          )}

          <button
            onClick={handleUpdate}
            className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
