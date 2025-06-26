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

  useEffect(() => {
    // Jika tidak ada item, redirect ke halaman cart
    if (!selectedCartItems || selectedCartItems.length === 0) {
      toast.warning("Keranjang kosong. Silakan pilih item terlebih dahulu.");
      navigate("/cart");
    }

    fetchPaymentMethods();
  }, []);

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

    try {
      await axios.post(
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

      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const transactionId = res.data.data.reverse()[0].id;

      toast.success("Transaksi berhasil!");
      navigate(`/detailtransaction/${transactionId}`);
    } catch (err) {
      console.error("Checkout gagal:", err);
      toast.error("Gagal melakukan checkout");
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-16 bg-white rounded-lg shadow">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Checkout
      </h1>

      {/* Hanya tampil jika ada item */}
      {selectedCartItems?.length > 0 && (
        <>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Pilih Metode Pembayaran:
          </h2>
          <div className="grid gap-4 mb-8 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`border p-4 rounded-lg flex items-center gap-4 cursor-pointer transition duration-300 hover:shadow ${
                  selectedPayment === method.id
                    ? "border-green-500 ring-2 ring-green-400"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={() => setSelectedPayment(method.id)}
                  className="accent-green-600"
                />
                <img
                  src={method.imageUrl}
                  alt={method.name}
                  className="object-contain w-14 h-14"
                />
                <span className="text-sm font-medium text-gray-800">
                  {method.name}
                </span>
              </label>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleCheckout}
              className="px-8 py-3 text-white transition duration-200 bg-green-600 rounded-full hover:bg-green-700"
            >
              Bayar Sekarang
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
