import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const token = localStorage.getItem("token");
  const { fartCount, setCartCount, fetchCartCount } = useCart();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Gagal Mengambil cart:", err);
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      fetchCart();
      fetchCartCount();
    } catch (err) {
      toast.error("Gagal update jumlah");
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Item berhasil dihapus");
      fetchCart();
      fetchCartCount();
    } catch (err) {
      toast.error("Gagal menghapus item");
    }
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.quantity * item.activity.price, 0);
  };

  const handleCheckout = async () => {
    try {
      const payload = {
        cartIds: selectedItems,
        paymentMethodId: selectedPayment,
      };

      console.log("Checkout Payload:", payload);

      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      console.log("Full response:", res.data);
      toast.success("Transaksi berhasil dibuat!");

      const transactions = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setCartCount(fartCount - selectedItems.length);
      const reverseTransaction = transactions.data.data.reverse();
      const transactionId = reverseTransaction[0].id;

      if (transactionId) {
        navigate(`/detailtransaction/${transactionId}`);
      } else {
        toast.error("Gagal mendapatkan ID transaksi.");
      }
    } catch (error) {
      console.error("Gagal checkout:", error);
      toast.error("Pilih Activity dulu!");
    }
  };

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
      toast.error("Pilih metode pembayaran lebih dulu");
    }
  };

  useEffect(() => {
    fetchCart();
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  }, [cartItems]);

  return (
    <div className="mt-20">
      <Navbar />
      <div className="grid max-w-6xl grid-cols-1 gap-6 p-4 mx-auto md:grid-cols-2 md:p-6">
        <div>
          <h1 className="mb-4 text-2xl font-bold">My Cart</h1>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="mr-2"
            />
            <label>Pilih Semua</label>
          </div>

          {cartItems.length === 0 ? (
            <p>Cart kamu kosong.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-start justify-between gap-4 p-4 mb-4 border rounded sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                    />
                    <img
                      src={item.activity.imageUrls[0]}
                      alt={item.activity.title}
                      className="object-cover w-32 h-24 rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold">{item.activity.title}</h2>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: Rp{item.activity.price.toLocaleString()}</p>
                    <p>
                      Total Item: Rp
                      {(item.quantity * item.activity.price).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDeleteCart(item.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6 text-right">
                <p className="text-xl font-bold">
                  Total Harga (terpilih): Rp
                  {calculateTotalPrice().toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>

        {/* PAYMENT METHODS */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Pilih Metode Pembayaran:
          </h2>
          <div className="grid gap-3 mb-6">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`border p-4 rounded flex items-center gap-3  cursor-pointer transition ${
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
                <img src={method.imageUrl} alt={method.name} className="w-12" />
                <span className="text-sm font-medium text-gray-800">
                  {method.name}
                </span>
              </label>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="pb-6 mt-4 text-right">
              <button
                onClick={handleCheckout}
                className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Checkout Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
