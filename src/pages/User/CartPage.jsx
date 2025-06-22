import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const token = localStorage.getItem("token");
  const { fetchCartCount } = useCart();
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

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("Pilih item yang ingin di-checkout");
      return;
    }

    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    navigate("/checkout", { state: { selectedCartItems } });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  }, [cartItems]);

  return (
    <div className="p-6">
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
              className="flex items-start justify-start p-4 mb-4 border rounded"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
              />
              <div className="flex items-center gap-4">
                <img
                  src={item.activity.imageUrls[0]}
                  alt={item.activity.title}
                  className="object-cover w-32 h-24 ml-16 rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.activity.title}</h2>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: Rp{item.activity.price.toLocaleString()}</p>
                  <p>
                    Total Item: Rp
                    {(item.quantity * item.activity.price).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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

          {/* Total Harga */}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total Harga (terpilih): Rp{calculateTotalPrice().toLocaleString()}
            </p>
          </div>
        </>
      )}

      {/* Tombol Checkout */}
      {cartItems.length > 0 && (
        <div className="mt-4 text-right">
          <button
            onClick={handleCheckout}
            className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Checkout Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
