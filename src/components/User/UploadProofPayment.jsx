import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UploadProofPayment = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [selectedeFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedeFile) return toast.error("Please select a file first");

    const formData = new FormData();
    formData.append("file", selectedeFile);

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        },
      );
      toast.success("Proof of payment uploaded successfully");
    } catch (err) {
      console.error("Failed to upload proof of payment", err);
      toast.error("Something went wrong while uploading");
    }
  };

  return (
    <div>
      <h2>Upload Payment Proff</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
export default UploadProofPayment;
