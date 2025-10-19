import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Get guestId from localStorage or generate new
const initialguestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialguestId);

// Initial state
const initialState = {
  user: userFromStorage,
  guestId: initialguestId,
  loading: false,
  error: null,
};

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      state.error = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId(state) {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      
.addCase(loginUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})
.addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

// Register
.addCase(registerUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(registerUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user= action.payload;
})
.addCase(registerUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

  }
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
