import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

const AddToCartButton = ({ activityId }) => {
  const { fetchCartCount } = useCart();
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        {
          activityId: activityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      toast.success("Berhasil ditambahkan ke keranjang");
      console.log("Cart response:", res.data);
      fetchCartCount;
    } catch (err) {
      console.error("Add to card failed", err);
      toast.error("Failed add to cart");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
    >
      Add to Cart
    </button>
  );
};
export default AddToCartButton;
