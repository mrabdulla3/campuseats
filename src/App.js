import "./App.css";
import Header from "./component/Header";
import Navbar from "./component/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Menu from "./pages/Menu";
import CustomerProfile from "./pages/CustomerProfile";
import RestaurantDashboard from "./pages/RestaurantDashbaord";
import RecipeGenerator from "./pages/RecipeGenerator";
import DeliveryboyDashboard from "./pages/DeliveryboyDashboard";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/dashboard" element={<RestaurantDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/recipe-generator" element={<RecipeGenerator />} />
          <Route
            path="/delivery-boy-dashboard"
            element={<DeliveryboyDashboard />}
          />
          <Route path="/confirm-order" element={<PaymentConfirmation />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
