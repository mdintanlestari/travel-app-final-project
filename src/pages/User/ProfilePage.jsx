import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import background from "../../assets/img/profilepage/background.jpg";

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
          error.response.data || error.message
        );
      }
    };
    getUser();
  }, []);

  return (
    <div className="relative ">
      <div
        className="absolute inset-0 min-h-screen bg-center bg-cover -z-10"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <div className="relative z-20 mt-24">
        <Navbar />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 -mt-14">
        {user ? (
          <div className="w-full max-w-lg p-6 mx-auto overflow-hidden transition duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl">
            <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
              Profile
            </h1>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={user.profilePictureUrl}
                alt="Profile"
                className="object-cover border-4 border-white rounded-full shadow-md w-36 h-36"
              />
              <p className="text-lg font-medium text-gray-700">
                Nama: {user.name}
              </p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              <p className="text-gray-600">Phone Number: {user.phoneNumber}</p>
            </div>
          </div>
        ) : (
          <p className="text-xl text-white">Loading data user...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
