import axios from "axios";
import { useEffect } from "react";

const AllTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

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
      setTransactions(res.data.data);
    } catch (err) {
      console.error("Gagal memuat transaksi", err);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [token]);

  return (
    <div>
      <h1>Semua Transaksi</h1>

      {transactions.length === 0 ? (
        <p>Tidak ada transaksi</p>
      ) : (
        transactions.map((trxs) => (
          <div key={trxs.id}>
            <h3>Invoice: {trxs.invoiceId}</h3>
            <p>
              Status: <strong>{trxs.status}</strong>
            </p>
            <p>Total: Rp.{trxs.totalAmount.toLocaleString("id-ID")}</p>
            <p>Metode Pembayaran: {trxs.payment_method.name}</p>
            <hr className="my-3" />
            <p>Detail Item:</p>
            {trxs.transaction_item.map((item) => (
              <div key={item.id}>
                <img src={item.imageUrls[0]} alt={item.title} />
                <p>{item.title}</p>
                <p>Harga: Rp.{item.price.toLocaleString("id-ID")}</p>
                <p>
                  Discount: Rp.{item.price_discount.toLocaleString("id-ID")}
                </p>
                <p>Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};
export default AllTransaction;
