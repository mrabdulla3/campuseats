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


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
