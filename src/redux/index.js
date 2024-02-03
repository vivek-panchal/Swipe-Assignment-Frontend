import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import updateReducer from "./updateBulk";

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  bulk: updateReducer,
});

export default rootReducer;
