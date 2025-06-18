import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
function DashboardPage() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <h1>Dashboard Page</h1>
      <ul>
        <li>
          {" "}
          <Link to={"/allUsers"}> All Users</Link>
        </li>
        <li>
          <Link to={"/userrole"}>Update Profile</Link>
        </li>
        <li>
          <Link to={"/admin/managebanner"}>Manage Banner</Link>
        </li>
        <li>
          <Link to={"/admin/managepromo"}>Manage Promo</Link>
        </li>
        <li>
          <Link to={"/admin/managecategory"}>Manage Category</Link>
        </li>
        <li>
          <Link to={"/admin/manageactivity"}>Manage Activity</Link>
        </li>
      </ul>
    </div>
  );
}
export default DashboardPage;
