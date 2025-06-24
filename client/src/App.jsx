
import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyAccount from './pages/VerifyAccount';
import LoadingVerify from './pages/LoadingVerify';
import ForgotPassword from './pages/ForgotPassword';
import Otp from './pages/Otp';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>

  );
};

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Các route không dùng layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:email" element={<VerifyAccount />} />
          <Route path="/verify-account/:email" element={<LoadingVerify />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
      </BrowserRouter>
    </>
  )
}

export default App
