import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ activityId }) => {
  const { cartCount, setCartCount } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    if (!token) {
      // Simpan activityId sementara
      localStorage.setItem("pendingAddToCart", activityId);
      navigate(`/login?prevPage=/activity/${activityId}`);
      return;
    }

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        { activityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      toast.success("Berhasil ditambahkan ke keranjang");
      setCartCount((prev) => prev + 1);
    } catch (err) {
      console.error("Gagal Add to Cart:", err.response?.data || err.message);
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
