import './App.css';
import About from './component/About';
import CampusEats from './component/Campuseats';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Navbar from './component/navbar';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Menu from './pages/Menu';
import CustomerProfile from './pages/CustomerProfile';
import VendorDashboard from './pages/VendorDashboard';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<VendorDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<CustomerProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
