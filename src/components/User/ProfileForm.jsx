import axios from "axios";
import { useEffect, useState } from "react";

// Update Profile Page
const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isButtonValid =
    name.trim() !== "" && email.trim() !== "" && phoneNumber.trim() !== "";

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPhoneNumber(res.data.data.phoneNumber);
      })
      .catch((error) => {
        setError("Gagal mengambil data profile");
      });
  }, [token]);

  const handleUpdate = async () => {
    const payload = {
      name,
      email,
      phoneNumber,
    };

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setSuccess("Profil Berhasil Diupdate!");
      setError("");
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label htmlFor="phone number">Phone Number</label>
        <input
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
      </form>

      <button onClick={handleUpdate} disabled={!isButtonValid}>
        Update Profile
      </button>
    </div>
  );
};
export default ProfileForm;
