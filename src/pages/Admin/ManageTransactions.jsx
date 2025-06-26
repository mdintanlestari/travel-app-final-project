import { useNavigate } from "react-router-dom";
import AllTransaction from "./AllTransaction";
import DetailTransaction from "../User/DetailTransaction";

const ManageTransaction = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Manage Transactions</h1>
      <AllTransaction />
    </div>
  );
};

export default ManageTransaction;
