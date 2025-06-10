
import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} /> */}
          </Route>

          {/* Các route không dùng layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
      </BrowserRouter>
    </>
  )
}

export default App
