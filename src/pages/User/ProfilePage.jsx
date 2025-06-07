import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../../components/Logout";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token dari localStorage:", token);

      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        const data = response.data.data;
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(
          "Gagal ambil data user:",
          error.response?.data || error.message
        );
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Nama: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>
      ) : (
        <p>Loading data user...</p>
      )}
      <Link to={"/allUsers"}> All Users</Link>
      <Logout />
    </div>
  );
};

export default ProfilePage;
