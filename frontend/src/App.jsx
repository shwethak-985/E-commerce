import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "sonner";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Profil from "./Pages/Profil";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./Components/products/productsDetails";
import Checout from "./Components/cart/Checout";
import OrderConfirmationPage from "./Pages/orderConformationPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import MyOrderPage from "./Pages/MyOrderPage";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHomepage from "./Pages/AdminHomepage";
import UserManagement from "./Components/Admin/userManagement";
import Productmanagement from "./Components/Admin/Productmanagement";
import EditProduct from "./Components/Admin/EditProduct";
import OrderManagement from "./Components/Admin/OrderManagement";
import { Provider } from "react-redux";
import store from "../Redux/store";
import ProtectedRoute from "./Components/Common/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* User Layout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profil />} />
           <Route path="collection/all" element={<CollectionPage />} />

            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checout />} />
            <Route path="order-conformation" element={<OrderConfirmationPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="myorders" element={<MyOrderPage />} />
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHomepage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<Productmanagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="shop" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
