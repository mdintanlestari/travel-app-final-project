import RegisterPage from "./pages/Public/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Public/LoginPage";
import HomePage from "./pages/Public/HomePage";
import ProfilePage from "./pages/User/ProfilePage";
import AllUsersPage from "./pages/Admin/AllUsersPage";
import ProfileForm from "./components/User/ProfileForm";
import UserRole from "./components/Admin/UserRole";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/allUsers" element={<AllUsersPage />}></Route>
          <Route path="/updateprofile" element={<ProfileForm />}></Route>
          <Route path="/userrole" element={<UserRole />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
