import { Link, Outlet } from "react-router-dom";
import Logout from "../../components/Logout";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen px-4 py-6 bg-green-900 border-r shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-center text-white">
            Admin Panel
          </h2>
          <nav className="flex flex-col space-y-3 ">
            <SidebarLink to="/admin" label="Dashboard" />
            <SidebarLink to="/admin/manageusers" label="Manage User" />
            <SidebarLink to="/admin/managebanner" label="Manage Banner" />
            <SidebarLink to="/admin/managepromo" label="Manage Promo" />
            <SidebarLink to="/admin/managecategory" label="Manage Category" />
            <SidebarLink to="/admin/manageactivity" label="Manage Activity" />
            <SidebarLink
              to="/admin/managetransactions"
              label="Manage Transactions"
            />
            <SidebarLink to="/" label="Home" />
          </nav>

          <div className="mt-10">
            <Logout />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 ">
          <h1 className="text-3xl font-bold">Welcome, {userName || "admin"}</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <div>
      <div>
        <Link
          to={to}
          className="block px-3 py-2 text-white transition rounded hover:bg-blue-100 hover:text-blue-700"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
