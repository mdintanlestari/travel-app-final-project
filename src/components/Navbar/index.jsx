import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-4 bg-gray-100">
      <ul className="flex items-center justify-end gap-8 mr-20 ">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/category" className="hover:text-blue-500">
            Category
          </Link>
        </li>
        <li>
          <Link to="/promo" className="hover:text-blue-500">
            Promo
          </Link>
        </li>
        <li>
          <Link to={"/cartpage"}>
            {" "}
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-xl text-gray-700"
            />
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-blue-500">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-500">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
