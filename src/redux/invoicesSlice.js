import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id == action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateAll: (state, action) => {
      for (let x of action.payload) {
        for (let y = 0; y < state.length; y++) {
          if (x.id === state[y].id) {
            state[y] = x;
          }
        }
      }
    }
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateAll
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
