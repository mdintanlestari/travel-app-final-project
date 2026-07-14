import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const TransactionList = () => {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirtsItem = indexOfLastItem - itemPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirtsItem,
    indexOfLastItem,
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          },
        );

        const sorted = res.data.data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        );

        setTransaction(sorted);
      } catch (err) {
        console.error("Gagal mengambil transaksi", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  if (loading) {
    return (
      <p className="mt-10 text-center text-gray-500">Loading Transaction...</p>
    );
  }

  if (!loading && transactions.length === 0) {
    return (
      <p className="mt-10 text-center text-gray-500">
        You don’t have any transactions yet.
      </p>
    );
  }

  return (
    <div className="bg-gray-200">
      <Navbar />
      <div className="max-w-6xl px-4 py-8 mx-auto mt-20">
        <h1 className="mb-6 text-2xl font-bold text-center">Booking History</h1>
        <ul className="space-y-6">
          {currentTransactions.map((trx) => {
            console.log("isi transaksi", trx);
            console.log("items:", trx.transaction_items);
            console.log("PROOF IMAGE:", trx.proofPaymentUrl);

            return (
              <li key={trx.id} className="p-6 bg-white shadow-md rounded-xl">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Informasi Transaksi */}
                  <div>
                    <p className="mb-2 text-lg font-semibold">
                      Transaction Details
                    </p>
                    <p>
                      <strong>Invoice:</strong> {trx.invoice}
                    </p>
                    <p>
                      <strong>Status:</strong> {trx.status}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(trx.orderDate).toLocaleString()}
                    </p>
                    <p>
                      <strong>Total:</strong> Rp
                      {trx.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  {/* Pembayaran */}
                  <div>
                    <p className="mb-2 text-lg font-semibold">
                      Payment Method:
                    </p>
                    <p>
                      <strong>Metode:</strong> {trx.payment_method?.name}
                    </p>
                    <p>
                      <strong>VA Number:</strong>{" "}
                      {trx.payment_method?.virtual_account_number}
                    </p>{" "}
                    <strong>Transfer Proof</strong>
                    {trx.proofPaymentUrl && (
                      <img
                        src={trx.proofPaymentUrl}
                        className="w-[50vh] h-[50vh] mt-5"
                      />
                    )}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p className="mb-2 text-lg font-semibold">Items Purchased</p>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {trx.transaction_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                      >
                        {item.imageUrls?.[0] && (
                          <img
                            src={item.imageUrls[0]}
                            alt={item.title}
                            className="object-cover w-24 h-24 rounded-md"
                          />
                        )}
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: Rp{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-900 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {currentPage} / {Math.ceil(transactions.length / itemPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(transactions.length / itemPerPage)
                ? prev + 1
                : prev,
            )
          }
          disabled={
            currentPage === Math.ceil(transactions.length / itemPerPage)
          }
          className="px-4 py-2 bg-slate-600 rounded hover:bg-slate-900 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
