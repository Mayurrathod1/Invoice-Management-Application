import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchInvoices, UpdateInvoice } from "../Thunks/invoiceThunks";
import { Invoice } from "../../Types/redux-types";


interface InvoiceState {
  items: Invoice[];
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoiceState = {
  items: [],
  ids: [],
  loading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
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
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.loading = false;
          if (Array.isArray(action.payload)) {
            action.payload.forEach((invoice: Invoice) => {
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
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(UpdateInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateInvoice.fulfilled, (state, action) => {
        state.loading = false;

        const { invoiceId, requestBody: updatedInvoice } = action?.payload!;

        // Find the product index and update it
        const index = state.items.findIndex(
          (invoice) => invoice.id === invoiceId
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedInvoice };
        } else {
          console.error("Invoice not found for update:", invoiceId);
        }
      })
      .addCase(UpdateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update invoice";
      });
  },
});

export const { addInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
