import axios from "axios";
import { useEffect, useState } from "react";

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
        console.log(response.data.data);
        setUsers(response.data.data);
      } catch (error) {
        console.log("gagal mengambil semua user:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Daftar Users</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <p>Id: {user.id}</p>
              <p>Nama: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <img
                src={user.profilePictureUrl}
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllUsersPage;
