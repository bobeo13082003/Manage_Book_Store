
import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

// const MainLayout = () => {
//   return (
//     <div>
//       <Header />
//       <main>
//         <Outlet /> {/* Đây là nơi các route con sẽ được render */}
//       </main>
//     </div>
//   );
// };

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} /> */}
          </Route>

          {/* Các route không dùng layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
