import { useState } from "react";
import axios from "axios";

const UserRole = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleUpdateRole = async () => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${userId}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setSuccess(`Berhasil update Role user ${userId} jadi ${role}`);
      setError("");
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-40">
        <div className="p-4 border rounded shadow-md w-80 h-80">
          <h2 className="mb-8 text-2xl font-semibold text-center">
            Update User Role
          </h2>

          <div>
            <label className="mt-8">User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Masukkan user ID"
              className="block w-full p-1 mb-2 border"
            />

            <label className="mt-8">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full p-1 mb-2 border"
              s
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <button
              onClick={handleUpdateRole}
              className="px-4 py-1 mt-5 text-white bg-blue-500 rounded"
            >
              Update Role
            </button>
          </div>

          {success && <p className="mt-2 text-green-600">{success}</p>}
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserRole;
