import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccsess] = useState("");
  const [error, setError] = useState("");

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
    const payload = {
      email: email,
      password: password,
    };
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
      setSuccsess("Login Success!!");
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
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

      <label htmlFor="email">Email :</label>
      <input
        type="text"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Email"
      />

      <label htmlFor="password">Password :</label>
      <input
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="password"
      />

      <button onClick={handleLogin} type="button" disabled={!isButtonValid}>
        Login
      </button>
    </div>
  );
}
export default LoginPage;
