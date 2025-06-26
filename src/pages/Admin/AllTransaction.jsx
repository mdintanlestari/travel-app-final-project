import axios from "axios";
import { useEffect, useState } from "react";
import UpdateTransactionStatus from "../../components/Admin/UpdateTransactionStatus";

const AllTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setTransactions(res.data.data.reverse() || []);
    } catch (err) {
      console.error("Gagal memuat transaksi", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onApproved = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: "success" }
        : transaction
    );
    setTransactions(updatedTransactions);
  };

  const onRejected = (id) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: "cancelled" }
        : transaction
    );
    setTransactions(updatedTransactions);
  };

  if (loading) return <p>Memuat transaksi...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Semua Transaksi</h1>

      {currentTransactions.length === 0 ? (
        <p>Tidak ada transaksi</p>
      ) : (
        currentTransactions.map((trxs) => (
          <div
            key={trxs.id}
            className="p-4 mb-6 bg-white border rounded-md shadow-sm"
          >
            <h3 className="text-lg font-semibold text-green-700">
              Invoice: {trxs.invoiceId}
            </h3>
            <p>
              Status: <strong>{trxs.status}</strong>
            </p>
            <p>Total: Rp. {trxs.totalAmount?.toLocaleString("id-ID")}</p>
            <p>Metode Pembayaran: {trxs.payment_method?.name || "-"}</p>
            <hr className="my-3" />
            <p className="font-semibold">Detail Item:</p>
            {trxs.transaction_items?.map((item) => (
              <div key={item.id} className="pl-4 mb-4">
                <img
                  src={item.imageUrls?.[0]}
                  alt={item.title}
                  className="object-cover w-24 h-24 mb-2 rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png?hl=id";
                  }}
                />
                <p>{item.title}</p>
                <p>Harga: Rp. {item.price?.toLocaleString("id-ID")}</p>
                <p>
                  Diskon: Rp. {item.price_discount?.toLocaleString("id-ID")}
                </p>
                <p>Qty: {item.quantity}</p>
              </div>
            ))}

            {trxs.status === "pending" && (
              <UpdateTransactionStatus
                id={trxs.id}
                onApproved={onApproved}
                onRejected={onRejected}
              />
            )}
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-900 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-900 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTransaction;
