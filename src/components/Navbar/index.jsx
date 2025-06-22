import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../Logout";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full p-4 bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to="/" className="text-xl font-bold text-green-600">
          Travel<span className="text-black">World</span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

        {/* Menu Utama */}
        <ul
          className={`flex flex-col md:flex-row md:items-center md:static absolute bg-white md:bg-transparent w-full left-0 md:w-auto md:space-x-6 top-16 md:top-0 px-4 md:px-0 transition-all duration-300 ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          <li>
            <Link to="/" className="block py-2 hover:text-green-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/category" className="block py-2 hover:text-green-600">
              Destination
            </Link>
          </li>
          <li>
            <Link to="/promo" className="block py-2 hover:text-green-600">
              Promo
            </Link>
          </li>
          <li>
            <Link to="/activity" className="block py-2 hover:text-green-600">
              Activity
            </Link>
          </li>
          <li className="relative flex items-center py-2">
            <Link to="/cart" className="relative">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-xl text-black"
              />
              {cartCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <Link
                  to="/register"
                  className="block py-2 hover:text-green-600"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="block py-2 hover:text-green-600">
                  Login
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li className="py-2">
              <Logout />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
