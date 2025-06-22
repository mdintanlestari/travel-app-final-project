import RegisterPage from "./pages/Public/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Public/LoginPage";
import HomePage from "./pages/Public/HomePage";
import ProfilePage from "./pages/User/ProfilePage";
import AllUsersPage from "./pages/Admin/AllUsersPage";
import ProfileForm from "./components/User/ProfileForm";
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
import PaymentMethodPage from "./pages/Public/PaymentMethodPage";
import CartPage from "./pages/User/CartPage";
import CheckoutPage from "./pages/User/CheckoutPage";
import TransactionList from "./pages/User/TransactionList";
import AllTransaction from "./pages/Admin/AllTransaction";
import DetailTransaction from "./pages/User/DetailTransaction";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/allUsers"
            element={
              <ProtectedRoute>
                <AllUsersPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute>
                <ProfileForm />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/userrole"
            element={
              <ProtectedRoute>
                <UserRole />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/admin/banner" element={<ManageBanner />}></Route>
          <Route path="/banner" element={<BannerList />}></Route>
          <Route path="/admin/createbanner" element={<BannerForm />}></Route>
          <Route
            path="/admin/updatebanner/:id"
            element={<UpdateBannerForm />}
          ></Route>
          <Route
            path="/admin/deletebanner/:id"
            element={<DeleteBannerPage />}
          ></Route>
          <Route path="/detailbanner/:id" element={<BannerDetail />}></Route>
          <Route path="/admin/managebanner" element={<ManageBanner />}></Route>
          <Route path="/admin/createpromo" element={<PromoForm />}></Route>
          <Route
            path="/admin/updatepromo/:id"
            element={<UpdatePromoForm />}
          ></Route>
          <Route path="/admin/managepromo" element={<ManagePromo />}></Route>
          <Route
            path="/admin/deletepromo/:id"
            element={<DeletePromoPage />}
          ></Route>
          <Route path="/promo" element={<PromoList />}></Route>
          <Route path="/detailpromo/:id" element={<PromoDetail />}></Route>
          <Route
            path="/admin/createcategory"
            element={<CategoryForm />}
          ></Route>
          <Route
            path="/admin/updatecategory/:id"
            element={<UpdateCategoryForm />}
          ></Route>
          <Route
            path="/admin/managecategory"
            element={<ManageCategory />}
          ></Route>
          <Route path="/category" element={<CategoryList />}></Route>
          <Route
            path="/detailcategory/:id"
            element={<CategoryDetail />}
          ></Route>
          <Route
            path="/admin/createactivity"
            element={<ActivityForm />}
          ></Route>
          <Route
            path="/admin/manageactivity"
            element={<ManageActivity />}
          ></Route>
          <Route
            path="/admin/updateactivity/:id"
            element={<UpdateActivityPage />}
          ></Route>
          <Route path="/activity" element={<ActivityList />}></Route>
          <Route
            path="/detailactivity/:id"
            element={<ActivityDetail />}
          ></Route>
          <Route path="/paymentmethod" element={<PaymentMethodPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/mytransaction" element={<TransactionList />}></Route>
          <Route path="/transactions" element={<AllTransaction />}></Route>
          <Route
            path="/detailtransaction/:id"
            element={<DetailTransaction />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
