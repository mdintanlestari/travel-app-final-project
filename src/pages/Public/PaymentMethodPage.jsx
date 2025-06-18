import axios from "axios";
import { useEffect, useState } from "react";

const PaymentMethodPage = () => {
  const [methods, setMethods] = useState([]);

  const token = localStorage.getItem("token");

  const fecthPaymentMethod = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setMethods(res.data.data);
    } catch (err) {
      console.error("gagal memuat metode pembayaran", err);
    }
  };
  useEffect(() => {
    fecthPaymentMethod();
  }, []);

  return (
    <div>
      <h1>Payment Methods</h1>
      <ul>
        {methods.map((method) => (
          <li key={method.id}>
            <p>{method.name}</p>
            <img src={method.imageUrl} alt={method.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PaymentMethodPage;
