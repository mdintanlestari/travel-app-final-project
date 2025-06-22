import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TransactionList = () => {
  const [transactions, setTransaction] = useState([]);
  const token = localStorage.setItem("token");

  const fetscTransactions = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setTransaction(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil tarnsaksi", err);
    }
  };

  useEffect(() => {
    fetscTransactions;
  });

  if (transactions.length === 0) {
    return <p>Kamu belum memiliki transaksi</p>;
  }

  return (
    <div>
      <h1>Riwayat Transaksi</h1>

      <ul>
        {transactions.map((trx) => (
          <li key={trx.id}>
            <div>
              <p>
                <strong>Invoice:</strong>
                {trx.invoice}
              </p>
              <p>
                <strong>Status:</strong>
                {trx.status}
              </p>
              <p>
                <strong>Tanggal:</strong>
                {new Date(trx.orderDate).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong>
                {trx.totalAmount.toLocaleString()}
              </p>
            </div>

            {/* METODE PEMBAYARAN */}
            <div>
              <p>
                <strong>Metode Pembayaran:</strong>
                {trx.payment_method.name}
              </p>
              <p>
                <strong>VA Number:</strong>
                {trx.payment_method.virtual_account_number}
              </p>
            </div>

            {/* ITEM YANG DIBELI */}
            <div>
              <h2>Item:</h2>
              {trx.transactions_items.map((item) => (
                <div key={item.id}>
                  <img src={item.imageUrls[0]} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Jumlah: {item.quantity}</p>
                    <p>Harga: Rp{item.price.toLocaleString}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to={`/transaction/${trx.id}`}>Detail Transaksi</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TransactionList;
