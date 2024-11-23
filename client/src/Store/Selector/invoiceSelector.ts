import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "../../Types/redux-types";

export const selectInvoiceProducts = (invoiceId: string) =>
  createSelector(
    (state: RootState) => state.products.items,
    (products: Product[]) =>
      products.filter((product: Product) => product.invoice_id === invoiceId)
  );

// Selector to calculate total amount for an invoice
export const selectInvoiceTotal = (invoiceId: string) =>
  createSelector(selectInvoiceProducts(invoiceId), (products: Product[]) =>
    products?.reduce((total: number, product: Product) => {
      return total + product.priceWithTax * product.quantity;
    }, 0)
  );
