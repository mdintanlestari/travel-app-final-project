import axios from "axios";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTransactionStatus = ({ id, onApproved, onRejected }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); //bisa ambil role di localstorage

  const handleUpdateStatus = async (newStatus) => {
    if (role !== "admin") {
      toast.error("Hanya admin yang bisa update status");
      return;
    }

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("successs");
      if (newStatus === "success") {
        onApproved(id);
      } else {
        onRejected(id);
      }
    } catch (err) {
      console.error("Gagal update status", err);
      toast.error("Terjadi kesalahan saat update status");
    }
  };

  if (role !== "admin") {
    return <p>Kmau tidak memiliki akses ke halaman ini</p>;
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Update Status Transaction</h2>

      <div className="space-x-3">
        <button
          onClick={() => handleUpdateStatus("success")}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Approve
        </button>

        <button
          onClick={() => handleUpdateStatus("failed")}
          className="py-2 text-white bg-red-600 rounded px-7 hover:bg-red-700"
        >
          Decline
        </button>
      </div>
    </div>
  );
};
export default UpdateTransactionStatus;
