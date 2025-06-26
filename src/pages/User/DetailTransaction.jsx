import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import UploadImage from "../../components/UploadImage";

const DetailTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [transaction, setTransaction] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (url) => {
    setImageUrl(url);
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${id}`,
        { proofPaymentUrl: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Bukti pembayaran berhasil dikirim!");
      navigate("/mytransactions");
    } catch (err) {
      console.error("Gagal kirim bukti pembayaran", err);
      toast.error("Upload ke API gagal");
    }
  };

  const fetchDetailTransaction = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setTransaction(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data transaksi", err);
    }
  };

  const handleCancelTransaction = async (id) => {
    const confirmCancel = window.confirm(
      "Yakin ingin membatalkan transaksi ini?"
    );
    if (!confirmCancel) return;

    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cancel-transaction/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Transaksi berhasil dibatalkan");
      fetchDetailTransaction(); // refresh data setelah cancel
      navigate("/mytransactions");
    } catch (err) {
      console.error("Gagal membatalkan transaksi", err);
      toast.error("Terjadi kesalahan");
    }
  };

  useEffect(() => {
    fetchDetailTransaction();
  }, [id, token]);

  if (!transaction) return <p>Loading detail transaction...</p>;

  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-3xl p-4 mx-auto mt-32 bg-white rounded shadow">
          <h2 className="mb-2 text-2xl font-bold">Detail Transaksi</h2>
          <p>
            <strong>Invoice:</strong> {transaction.invoiceId}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Total:</strong> Rp{" "}
            {transaction.totalAmount.toLocaleString("id-ID")}
          </p>
          <p>
            <strong>Tanggal Order:</strong>{" "}
            {new Date(transaction.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Metode Pembayaran:</strong>{" "}
            {transaction.payment_method?.name}
          </p>

          <hr className="my-4" />

          <h3 className="mb-2 text-lg font-semibold">Detail Item:</h3>
          {transaction.transaction_items.map((item) => (
            <div key={item.id} className="p-2 mb-2 bg-gray-100 rounded">
              <img
                src={item.imageUrls[0]}
                alt={item.title}
                className="w-32 mb-2"
              />
              <p>{item.title}</p>
              <p>Harga: Rp {item.price.toLocaleString("id-ID")}</p>
              <p>Diskon: Rp {item.price?.toLocaleString() ?? "-"}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}

          {transaction.status === "pending" && (
            <button
              onClick={() => handleCancelTransaction(transaction.id)}
              className="px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Batalkan Transaksi
            </button>
          )}

          {/* Upload Proof Payment */}
          <div className="p-2 pb-32 mt-10 mb-2 bg-gray-100 rounded">
            <h2 className="mt-10 text-lg font-semibold">Upload Payment </h2>

            <UploadImage onUploadSuccess={handleImageUpload} />
            {imageUrl && <p>Image berhasil di-upload ke: {imageUrl}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaction;
