import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePromoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("token yang dikirim", token);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
  });

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        const data = res.data.data;
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          terms_condition: "",
          promo_code: "",
          promo_discount_price: "",
          minimum_claim_price: "",
        });
      } catch (error) {
        toast.error("Gagal mengambil data promo");
      }
    };

    fetchPromo();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      promo_discount_price: Number(formData.promo_discount_price),
      minimum_claim_price: Number(formData.minimum_claim_price),
    };

    console.log("Payload update:", payload);

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Promo berhasil diupdate");
      navigate("/admin/managepromo");
    } catch (error) {
      console.error(
        " Gagal update promo:",
        error.response?.data || error.message
      );
      toast.error(
        "Gagal update promo: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-white rounded shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Update Promo
        </h2>

        {[
          {
            label: "Nama Promo",
            name: "title",
            placeholder: "Masukkan nama promo",
          },
          {
            label: "Deskripsi",
            name: "description",
            placeholder: "Masukkan deskripsi",
          },
          {
            label: "URL Gambar",
            name: "imageUrl",
            placeholder: "Masukkan Url Gambar",
          },
          {
            label: "Syarat & Ketentuan",
            name: "terms_condition",
            placeholder: "masukkan persyaratan",
          },
          {
            label: "Kode Promo",
            name: "promo_code",
            placeholder: "masukkan kode promo",
          },
          {
            label: "Nominal Diskon",
            name: "promo_discount_price",
            placeholder: "Masukkan Jumlah",
          },
          {
            label: "Minimum Pembelian",
            name: "minimum_claim_price",
            placeholder: "Masukkan jumlah ",
          },
        ].map(({ label, name, placeholder }) => (
          <div className="mb-4" key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Update Promo
        </button>
      </form>
    </div>
  );
};

export default UpdatePromoForm;
