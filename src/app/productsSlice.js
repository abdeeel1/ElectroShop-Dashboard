import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const response = await axios.get("https://json-api-backend-production.up.railway.app/products")
    return response.data
  }
)

const initialState = {
  items: [],
  status: 'idle',
  error: null
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload)
    },
    updateProduct: (state, action) => {
      const { id, ...updatedData } = action.payload
      const index = state.items.findIndex(product => product.id === id)
      if (index !== -1) state.items[index] = { ...state.items[index], ...updatedData }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions
export default productsSlice.reducer