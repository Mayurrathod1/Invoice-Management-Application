import apiServices from "../../Services/api-services";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../Types/redux-types";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data: Product[] = await apiServices.get("/products");
      return data;
    } catch (error: any) {
      console.log("error while fetching products", error);
      return rejectWithValue({ message: error?.message });
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "product/update",
  async (
    { productId, body }: { productId: string; body: any },
    { rejectWithValue }
  ) => {
    try {
      await apiServices.put(`/product/${productId}`, body);
      return { productId: productId, updateProduct: body };
    } catch (error: any) {
      console.log("error while updating product", error.message);
      rejectWithValue({ message: error?.message });
    }
  }
);
