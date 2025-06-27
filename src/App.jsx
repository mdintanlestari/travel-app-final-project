import RegisterPage from "./pages/Public/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Public/LoginPage";
import HomePage from "./pages/Public/HomePage";
import AllUsersPage from "./pages/Admin/AllUsersPage";
import ProfilePage from "./components/User/ProfilePage";
import UserRole from "./components/Admin/UserRole";
import DashboardPage from "./pages/Admin/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BannerList from "./components/Public/BannerList";
import BannerForm from "./components/Admin/BannerForm";
import UpdateBannerForm from "./components/Admin/UpdateBannerForm";
import DeleteBannerPage from "./components/Admin/DeleteBannerPage";
import BannerDetail from "./pages/Public/BannerDetail";
import ManageBanner from "./pages/Admin/ManageBanner";
import PromoForm from "./components/Admin/PromoForm";
import UpdatePromoForm from "./components/Admin/UpdatePromoForm";
import ManagePromo from "./pages/Admin/ManagePromo";
import DeletePromoPage from "./components/Admin/DeletePromopage";
import PromoList from "./components/Public/PromoList";
import PromoDetail from "./pages/Public/PromoDetail";
import CategoryForm from "./components/Admin/CategoryForm";
import UpdateCategoryForm from "./components/Admin/UpdateCategoryForm";
import ManageCategory from "./pages/Admin/ManageCategory";
import CategoryList from "./components/Public/CategoryList";
import CategoryDetail from "./pages/Public/CategoryDetail";
import ActivityForm from "./components/Admin/ActivityForm";
import ManageActivity from "./pages/Admin/ManageActivity";
import UpdateActivityPage from "./components/Admin/UpdateActivityPage";
import ActivityList from "./components/Public/ActivityList";
import ActivityDetail from "./pages/Public/ActivityDetail";
import CartPage from "./pages/User/CartPage";
import CheckoutPage from "./pages/User/CheckoutPage";
import TransactionList from "./pages/User/TransactionList";
import AllTransaction from "./pages/Admin/AllTransaction";
import DetailTransaction from "./pages/User/DetailTransaction";
import UpdateTransactionStatus from "./components/Admin/UpdateTransactionStatus";
import UploadImage from "./components/UploadImage";
import ManageTransaction from "./pages/Admin/ManageTransactions";
import MyProfile from "./pages/User/MyProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Users routes */}
          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute requiredRole="user">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="user">
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="user">
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute requiredRole="user">
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mytransactions"
            element={
              <ProtectedRoute requiredRole="user">
                <TransactionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detailtransaction/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <DetailTransaction />
              </ProtectedRoute>
            }
          />
          {/* Admin routes */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route path="managebanner" element={<ManageBanner />} />
            <Route path="managepromo" element={<ManagePromo />} />
            <Route path="managecategory" element={<ManageCategory />} />
            <Route path="manageactivity" element={<ManageActivity />} />
            <Route path="managetransactions" element={<ManageTransaction />} />
            <Route path="manageusers" element={<AllUsersPage />} />
          </Route>
          <Route
            path="/admin/createbanner"
            element={
              <ProtectedRoute requiredRole="admin">
                <BannerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/updatebanner/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdateBannerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/deletebanner/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <DeleteBannerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/createpromo"
            element={
              <ProtectedRoute requiredRole="admin">
                <PromoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/updatepromo/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdatePromoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/deletepromo/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <DeletePromoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/createcategory"
            element={
              <ProtectedRoute requiredRole="admin">
                <CategoryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/updatecategory/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdateCategoryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/createactivity"
            element={
              <ProtectedRoute requiredRole="admin">
                <ActivityForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/updateactivity/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdateActivityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/updatestatus/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdateTransactionStatus />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/transactions" element={<AllTransaction />} />
          <Route
            path="/userrole"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserRole />
              </ProtectedRoute>
            }
          />
          {/* Public routes */}
          <Route path="/banner" element={<BannerList />} />
          <Route path="/detailbanner/:id" element={<BannerDetail />} />
          <Route path="/promo" element={<PromoList />} />
          <Route path="/detailpromo/:id" element={<PromoDetail />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/detailcategory/:id" element={<CategoryDetail />} />
          <Route path="/activity" element={<ActivityList />} />
          <Route path="/detailactivity/:id" element={<ActivityDetail />} />
          <Route path="/uploadimage" element={<UploadImage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
