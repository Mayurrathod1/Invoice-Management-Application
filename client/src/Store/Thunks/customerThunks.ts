import apiServices from "../../Services/api-services";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Customer } from "../../Types/redux-types";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data: Customer[] = await apiServices.get("/customers");
      console.log("customer-data", data);
      return data;
    } catch (error: any) {
      console.log("error while fetching customers", error);
      return rejectWithValue({ message: error?.message });
    }
  }
);

export const UpdateCustomer = createAsyncThunk(
  "customer/update",
  async (
    { customerId, body }: { customerId: string; body: any },
    { rejectWithValue }
  ) => {
    try {
      const updateCustomer = await apiServices.put(
        `/customer/${customerId}`,
        body
      );
      return { customerId: customerId, updatedCustomer: body };
    } catch (error: any) {
      console.log("error while updating customers", error.message);
      rejectWithValue({ message: error?.message });
    }
  }
);
