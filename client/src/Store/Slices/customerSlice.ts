import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInvoices } from "../Thunks/invoiceThunks";

import { fetchCustomers, UpdateCustomer } from "../Thunks/customerThunks";
import { Customer } from "../../Types/redux-types";

interface CustomerState {
  items: Customer[];
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  items: [],
  ids: [],
  loading: true,
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Customer>) => {
      const invoice = action.payload;
      if (!state.ids.includes(invoice.id)) {
        // Check if the ID already exists
        state.ids.push(invoice.id);
        state.items.push(invoice);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.loading = false;
          if (Array.isArray(action.payload)) {
            action.payload.forEach((invoice: Customer) => {
              if (!state.ids.includes(invoice?.id)) {
                state.ids.push(invoice?.id);
                state.items.push(invoice);
              }
            });
          } else {
            console.error("Payload is not an array:", action.payload);
          }
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(UpdateCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateCustomer.fulfilled, (state, action) => {
        state.loading = false;

        const { customerId, updatedCustomer } = action?.payload!;

        // Find the product index and update it
        const index = state.items.findIndex(
          (customer) => customer.id === customerId
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedCustomer };
        } else {
          console.error("customer not found for update:", customerId);
        }
      })
      .addCase(UpdateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update product";
      });
  },
});

export const { addInvoice } = customerSlice.actions;

export default customerSlice.reducer;
