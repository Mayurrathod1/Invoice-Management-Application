import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice, Product } from "@/src/Types/redux-types";
import { fetchProducts, UpdateProduct } from "../Thunks/productThunk";

interface ProductsState {
  items: Product[];
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  ids: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addproduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (!state.ids.includes(product.id)) {
        state.ids.push(product.id);
        state.items.push(product);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          if (Array.isArray(action.payload)) {
            action.payload.forEach((product: Product) => {
              if (!state.ids.includes(product.id)) {
                state.ids.push(product.id);
                state.items.push(product);
              }
            });
          } else {
            console.error(
              "Payload is not an array in product slice:",
              action.payload
            );
          }
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const { productId, updateProduct } = action?.payload!;

        // Find the product index and update it
        const index = state.items.findIndex(
          (product) => product.id === productId
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updateProduct };
        } else {
          console.error("Product not found for update:", productId);
        }
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update product";
      });
  },
});

export const { addproduct } = productsSlice.actions;

export default productsSlice.reducer;
