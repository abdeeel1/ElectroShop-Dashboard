import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async () => {
    const response = await axios.get("https://json-api-backend-production.up.railway.app/customers");
    return response.data;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { addCustomer } = customersSlice.actions;
export default customersSlice.reducer;