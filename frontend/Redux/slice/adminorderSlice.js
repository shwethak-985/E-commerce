import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });
      return response.data; // should be an array of orders
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: USER_TOKEN,
          },
        }
      );
      return response.data; // updated order object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order");
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete order");
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        const orders = action.payload || [];
        state.loading = false;
        state.orders = orders;
        state.totalOrders = orders.length;
        state.totalSales = orders.reduce(
          (acc, order) => acc + (order.totalPrice || 0),
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      // DELETE ORDER
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.orders = state.orders.filter((order) => order._id !== deletedId);
        state.totalOrders = state.orders.length;
        state.totalSales = state.orders.reduce(
          (acc, order) => acc + (order.totalPrice || 0),
          0
        );
      })

      // GENERIC ERROR HANDLING
      .addMatcher(
        (action) =>
          action.type.startsWith("adminOrders/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default adminOrderSlice.reducer;
