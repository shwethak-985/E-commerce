import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products with filters
export const fetchProductsByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async ({
        collection,
        size,
        color,
        gender,
        minprice,
        maxprice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,

    }) => {
        const query = new URLSearchParams();
        if (collection) query.append("collection", collection);
        if (size) query.append("size", size);
        if (color) query.append("color", color);
        if (gender) query.append("gender", gender);
        if (minprice) query.append("minprice", minprice);
        if (maxprice) query.append("maxprice", maxprice);
        if (sortBy) query.append("sortBy", sortBy);
        if (search) query.append("search", search);
        if (category) query.append("category", category);
        if (material) query.append("material", material);
        if (brand) query.append("brand", brand);
        if (limit) query.append("limit", limit);


        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return response.data;
    }
);

// Fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        return response.data;
    }
);

// Update a product by ID
export const updateProduct = createAsyncThunk(
    "product/updatePrduct",
    async ({ id, productData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
);

// Fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async ({ id }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
        );
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      // Get user token from state or localStorage
      // Adjust according to how you store user info
      const token = localStorage.getItem("userToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, config);

      return id;  // return the deleted product id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minprice: "",
            maxprice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minprice: "",
                maxprice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "",
            };
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchProductsByFilters.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
            state.loading = false;
            state.products = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(fetchProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.products.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(fetchSimilarProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.similarProducts = action.payload;
        })
        .addCase(fetchSimilarProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder
  .addCase(deleteProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(deleteProduct.fulfilled, (state, action) => {
    state.loading = false;
    // Remove deleted product from state.products
    state.products = state.products.filter(product => product._id !== action.payload);
  })
  .addCase(deleteProduct.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
  });



    },
});

export const { setFilters, clearFilters } = productSlice.actions;

export default productSlice.reducer;
