import axios from "axios";
import { useEffect, useState } from "react";
import photo from "../../assets/img/userrole/photo.jpg";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log("gagal mengambil semua user:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold text-center">Daftar Users</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 transition bg-white rounded-lg shadow hover:shadow-lg"
          >
            <img
              src={user.profilePictureUrl}
              alt="Profile"
              className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = photo;
              }}
            />
            <div className="text-center">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
              <p className="text-sm">Phone: {user.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
