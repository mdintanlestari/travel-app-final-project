import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      setIsLoggedIn(!!token);
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Berhasil logout");
      navigate("/");
      window.location.reload();
    } catch {
      toast.error("Gagal logout");
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full p-4 bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to="/" className="text-xl font-bold text-green-600">
          Travel<span className="text-black">World</span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        {/* Menu List */}
        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 transition-all duration-300 shadow-md md:shadow-none z-40 ${
            isMenuOpen ? "block" : "hidden md:flex"
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
          <li>
            <Link
              to="/cart"
              className="relative block py-2 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && (
                <span className="absolute top-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -right-2">
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

          {isLoggedIn && user?.role === "user" && (
            <li className="relative block py-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              >
                {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "User"}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border rounded shadow-md">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/mytransactions");
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    My Transactions
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}

          {/* ADMIN */}
          {isLoggedIn && user?.role === "admin" && (
            <li className="relative block py-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-100"
              >
                {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "User"}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border rounded shadow-md">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/mytransactions");
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    My Transactions
                  </button>
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
