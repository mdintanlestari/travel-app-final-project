import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

import photo1 from "../../assets/img/register/photo1.jpg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccsess] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let prevPage = searchParams.get("prevPage"); // ambil dari URL

  if (prevPage?.startsWith("/activity/")) {
    prevPage = prevPage.replace("/activity/", "/detailactivity/");
  }

  const isButtonValid = email.trim() !== "" && password.trim() !== "";

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(response);

      const profileResponse = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const role = profileResponse.data.data.role;
      localStorage.setItem("role", role);

      const userData = profileResponse.data.data;
      localStorage.setItem("user", JSON.stringify(userData));

      console.log(profileResponse);

      setSuccsess("Login Success!!");

      setTimeout(() => {
        if (prevPage) {
          navigate(prevPage);
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-cover">
      {/* Background Blur */}
      <img
        src={photo1}
        alt="background"
        className="absolute inset-0 object-cover w-full h-full blur-sm -z-10"
      />

      <div className="z-10 flex items-center justify-center w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="w-full p-6 space-y-4 shadow-lg sm:w-96 bg-white/70 backdrop-blur-md rounded-xl"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>

          {success && <p className="font-medium text-green-700">{success}</p>}
          {error && !success.length && (
            <p className="font-medium text-red-600">{error}</p>
          )}

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Email"
              className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Password"
              className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={!isButtonValid}
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
