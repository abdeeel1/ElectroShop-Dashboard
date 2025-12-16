import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://json-api-backend-production.up.railway.app/sales";

/* ---------------------- FETCH SALES ---------------------- */
export const fetchSales = createAsyncThunk(
  "sales/fetch",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

/* ---------------------- ADD SALE ------------------------- */
export const addSale = createAsyncThunk(
  "sales/add",
  async (saleData) => {
    const response = await axios.post(API_URL, saleData);
    return response.data;
  }
);

/* ---------------------- UPDATE SALE ---------------------- */
export const updateSale = createAsyncThunk(
  "sales/update",
  async ({ id, updatedSale }) => {
    const response = await axios.put(
      `https://json-api-backend-production.up.railway.app/sales/${id}`,
      updatedSale
    );
    return response.data;
  }
);


/* ---------------------- DELETE SALE ---------------------- */
export const deleteSaleAsync = createAsyncThunk(
  "sales/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

/* ---------------------- SLICE ---------------------------- */
const salesSlice = createSlice({
  name: "sales",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    // Actions synchrones simples
    addSaleLocal: (state, action) => {
      state.data.unshift(action.payload);
    },
    
    deleteSaleLocal: (state, action) => {
      state.data = state.data.filter(s => s.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      /* ---------- ADD ---------- */
      .addCase(addSale.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })

      .addCase(updateSale.fulfilled, (state, action) => {
        const index = state.data.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteSaleAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(s => s.id !== action.payload);
      });
  }
});

// Export des actions
export const { addSaleLocal, deleteSaleLocal } = salesSlice.actions;

// Export du reducer
export default salesSlice.reducer;

// Fonction utilitaire simple pour calculer le CA du jour
export const calculateDailyRevenue = (sales) => {
  const today = new Date().toISOString().split('T')[0];
  
  return sales
    .filter(sale => sale.date === today)
    .reduce((sum, sale) => sum + sale.total, 0);
};

// Fonction pour calculer le CA du mois
export const calculateMonthlyRevenue = (sales) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  return sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getMonth() + 1 === currentMonth && 
             saleDate.getFullYear() === currentYear;
    })
    .reduce((sum, sale) => sum + sale.total, 0);
};

// Fonction pour calculer le panier moyen
export const calculateAverageCart = (sales) => {
  if (sales.length === 0) return 0;
  
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  return totalRevenue / sales.length;
};