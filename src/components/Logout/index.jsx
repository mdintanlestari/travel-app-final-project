import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    console.log("Token yang dikirim:", token);

    if (!token) {
      toast.error("Token tidak ditemukan, silakan login ulang.");
      return;
    }

    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      console.log("Respon logout:", response.data);

      localStorage.removeItem("token");
      setSuccess("Berhasil logout");
      toast.success("Berhasil logout");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Logout gagal";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};
export default Logout;
