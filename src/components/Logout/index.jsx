import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const [success, setSuccsess] = useState("");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

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
      setSuccsess("Logout Success");
      console.log(response.data);

      // hapus token dari local storage
      localStorage.removeItem("token");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response);
    }
  };

  return (
    <div>
      {success && (
        <p className="mb-2 text-lg font-semibold text-green-700">{success}</p>
      )}
      {error && !success.length && (
        <p className="mb-2 text-lg font-semibold text-red-600">{error}</p>
      )}

      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};
export default Logout;
