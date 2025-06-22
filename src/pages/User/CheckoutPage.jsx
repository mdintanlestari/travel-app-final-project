import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { selectedCartItems } = location.state || {};
  const cartIds = selectedCartItems?.map((item) => item.id) || [];

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  const fetchPaymentMethods = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setPaymentMethods(res.data.data);
    } catch (err) {
      console.error("Gagal ambil metode pembayaran", err);
    }
  };

  const handleCheckout = async () => {
    if (!selectedPayment) {
      toast.error("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    if (cartIds.length === 0) {
      toast.error("Tidak ada item yang dipilih");
      return;
    }

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        {
          cartIds,
          paymentMethodId: selectedPayment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const transactionId = response.data.data.id;
      toast.success("Transaksi berhasil!");
      navigate(`/detailtransaction/${transactionId}`);
    } catch (err) {
      console.error("Checkout gagal:", err);
      toast.error("Gagal melakukan checkout");
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>

      <h2 className="mb-2 font-semibold">Pilih Metode Pembayaran:</h2>
      <div className="grid gap-3 mb-6">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`border p-4 rounded flex items-center gap-3 cursor-pointer ${
              selectedPayment === method.id ? "border-green-500" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedPayment === method.id}
              onChange={() => setSelectedPayment(method.id)}
            />
            <img src={method.imageUrl} alt={method.name} className="w-12" />
            {method.name}
          </label>
        ))}
      </div>

      <button
        onClick={handleCheckout}
        className="px-6 py-2 text-white bg-green-600 rounded"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default CheckoutPage;
