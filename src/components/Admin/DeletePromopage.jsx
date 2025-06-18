import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeletePromoPage = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus banner ini?");
    if (!confirm) return navigate("/promos");

    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setMessage("Promo berhasil dihapus!");
      setTimeout(() => {
        navigate("/admin/managepromo");
      }, 1500);
    } catch (error) {
      setMessage("Gagal menghapus promo: " + error.response?.data?.message);
    }
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <div>
      <h1>Delete Promo</h1>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeletePromoPage;
