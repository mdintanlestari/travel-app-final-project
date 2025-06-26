import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import photo from "../../assets/img/userrole/photo.jpg";

const USERS_PER_PAGE = 8;

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // NEW
  const token = localStorage.getItem("token");

  const getUsers = async () => {
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
      setUsers(response.data.data.reverse());
    } catch (error) {
      console.log("Gagal mengambil semua user:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success(`Berhasil update role menjadi ${newRole}`);
      await getUsers();
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Gagal update role");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 mx-auto md:p-6 max-w-7xl">
      <h1 className="mb-6 text-2xl font-bold text-center md:text-3xl">
        Daftar Users
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center px-4 mb-6">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset halaman saat pencarian
          }}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-0">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 transition bg-white rounded-lg shadow hover:shadow-md"
          >
            <img
              src={user.profilePictureUrl}
              alt="Profile"
              className="object-cover w-24 h-24 mx-auto mb-4 rounded-full md:w-32 md:h-32"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = photo;
              }}
            />
            <div className="space-y-1 text-center">
              <p className="text-base font-semibold md:text-lg">{user.name}</p>
              <p className="text-sm text-gray-600 break-words">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
              <p className="text-sm">Phone: {user.phoneNumber}</p>
              <select
                value={user.role}
                onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                className="w-full p-1 mt-2 border rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 text-sm sm:text-base">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Previous
          </button>
          <span className="font-semibold">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white rounded ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
