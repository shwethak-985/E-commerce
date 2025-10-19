import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice";
import productReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import adminReducer from "./slice/adminSlice";
import adminProductsReducer from "./slice/adminProductSlice";
import adminOrdersReducer from "./slice/adminorderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductsReducer,  // changed to plural camelCase
    adminOrders: adminOrdersReducer,
  },
});

export default store;
