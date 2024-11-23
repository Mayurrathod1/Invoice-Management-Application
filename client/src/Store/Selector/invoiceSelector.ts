import { Product } from "@/src/Types/redux-types";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectInvoiceProducts = (invoiceId: string) =>
    createSelector(
      (state: RootState) => state.products.items,
      (products) => products.filter((product : Product) => product.invoice_id === invoiceId)
    );
  
  // Selector to calculate total amount for an invoice
  export const selectInvoiceTotal = (invoiceId: string) =>
    createSelector(
      selectInvoiceProducts(invoiceId),
      (products) =>
        products?.reduce((total, product) => {
          return total + product.priceWithTax * product.quantity;
        }, 0)
    );
  