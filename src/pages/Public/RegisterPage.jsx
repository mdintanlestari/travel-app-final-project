import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import photo1 from "../../assets/img/register/photo1.jpg";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "admin",
    phoneNumber: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, repeatPassword, role, phoneNumber } =
      formData;

    if (
      !name ||
      !email ||
      !password ||
      !repeatPassword ||
      !role ||
      !phoneNumber
    ) {
      setError("Please Fill All Fields!");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      name,
      email,
      password,
      passwordRepeat: repeatPassword,
      role,
      phoneNumber,
    };

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Register Success!!");
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Registration Failed");
      console.error("Register error:", error.response?.data);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover">
      {/* Background Blur */}
      <img
        src={photo1}
        alt="background"
        className="absolute inset-0 object-cover w-full h-full blur-sm -z-10"
      />

      <div className="flex items-center justify-center min-h-screen px-4 ">
        <div className="w-full max-w-md p-6 shadow-lg bg-white/60 backdrop-blur-md rounded-xl">
          <form className="flex flex-col gap-1" onSubmit={handleRegister}>
            <h1 className="-mt-2 text-2xl font-bold text-center">Register</h1>
            {success && (
              <p className="mb-1 font-semibold text-green-700">{success}</p>
            )}
            {error && !success.length && (
              <p className="mb-1 font-semibold text-red-600">{error}</p>
            )}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-4 rounded-md"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 px-4 rounded-md"
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-10 px-4 rounded-md"
            />

            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="w-full h-10 px-4 rounded-md"
            />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full h-10 px-4 rounded-md"
            />

            <label htmlFor="role">Select Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="h-10 px-4 rounded-md w-28"
            >
              <option value="admin" className="rounded-md">
                Admin
              </option>
              <option value="user" className="rounded-md">
                User
              </option>
            </select>

            <button
              type="submit"
              className="py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
