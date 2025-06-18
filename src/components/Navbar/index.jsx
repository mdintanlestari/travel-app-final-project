import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../Logout";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // cek local storage saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full p-4 font-medium shadow-sm bg-white/70 ">
      <ul className="flex items-center justify-end gap-8 mr-20 ">
        <li>
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/category" className="hover:text-green-600">
            Category
          </Link>
        </li>
        <li>
          <Link to="/promo" className="hover:text-green-600">
            Promo
          </Link>
        </li>
        <li>
          <Link to="/activity" className="hover:text-green-600">
            Activity
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
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/register" className="hover:text-green-600">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-600">
                Login
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <Logout />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
