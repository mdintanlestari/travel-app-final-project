import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 text-white bg-gray-900">
      <div className="grid grid-cols-1 gap-8 px-6 py-10 mx-auto max-w-7xl md:grid-cols-4">
        {/* Logo & Desc */}
        <div>
          <h2 className="mb-2 text-xl font-bold">Traveller For Life</h2>
          <p className="text-sm text-gray-400">
            Discover the world’s best destinations with unforgettable
            experiences.
          </p>
        </div>

        {/*  Navigation */}
        <div>
          <h3 className="mb-2 font-semibold">Navigation</h3>
          <ul className="grid grid-cols-2 space-y-1 text-sm md:grid-cols-4 ">
            <li>
              <Link to="/" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/promo" className="hover:text-green-400">
                Promo
              </Link>
            </li>
            <li>
              <Link to="/activity" className="hover:text-green-400">
                Activity
              </Link>
            </li>
            <li>
              <Link to="/category" className="hover:text-green-400">
                Destination
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-2 font-semibold">Contact</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Email: travelworld@travel.com</li>
            <li>Phone: +62 812-3456-7890</li>
            <li>Bali, Indonesia</li>
          </ul>
        </div>

        {/*  Social Media */}
        <div>
          <h3 className="mb-2 font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white">
              Instagram
            </a>
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="py-4 text-sm text-center text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Traveller For Life. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
