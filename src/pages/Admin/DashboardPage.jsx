import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Logout from "../../components/Logout";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen px-4 py-6 border-r shadow-sm bg-blue-950">
          <h2 className="mb-6 text-xl font-semibold text-center text-white">
            Admin Panel
          </h2>
          <nav className="flex flex-col space-y-3">
            <SidebarLink to="/allUsers" label="Manage User" />
            <SidebarLink to="/userrole" label="Update Profile" />
            <SidebarLink to="/admin/managebanner" label="Manage Banner" />
            <SidebarLink to="/admin/managepromo" label="Manage Promo" />
            <SidebarLink to="/admin/managecategory" label="Manage Category" />
            <SidebarLink to="/admin/manageactivity" label="Manage Activity" />
          </nav>

          <div className="mt-10">
            <Logout />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Selamat datang di Dashboard Admin
          </h1>
          <p className="mt-2 text-gray-600">
            Silakan pilih menu di sidebar untuk mengelola konten.
          </p>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 text-gray-700 transition rounded hover:bg-blue-100 hover:text-blue-700"
    >
      {label}
    </Link>
  );
}

export default DashboardPage;
