import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

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
      localStorage.removeItem("user");

      toast.success("Berhasil logout");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Logout gagal";
      toast.error(errorMsg);
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="py-1 text-center text-white bg-black border rounded-md w-28 h-9 hover:bg-slate-500">
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
