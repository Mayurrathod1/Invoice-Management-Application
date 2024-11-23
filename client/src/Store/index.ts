import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import InvoiceReducer from "./Slices/invoiceSlice";
import ProductReducer from "./Slices/productSlice";
import CustomerReducer from "./Slices/customerSlice";

export const store = configureStore({
  reducer: {
    invoices: InvoiceReducer,
    products: ProductReducer,
    customers: CustomerReducer,
  },
  // Optional middleware or enhancers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for async thunks
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
