import apiServices from "../../Services/api-services";
import { Invoice } from "@/src/Types/redux-types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data: any = await apiServices.get("/invoices");
      return data?.invoices;
    } catch (error: any) {
      console.log("error while fetching invoices", error);
      return rejectWithValue({ message: error?.message });
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoice/create",
  async (formdata: any, { rejectWithValue }) => {
    try {
      const data = await apiServices.post("/extract", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error: any) {
      console.log("error while extracting data", error.message);
      return rejectWithValue({ message: error?.message });
    }
  }
);

export const UpdateInvoice = createAsyncThunk(
  "invoice/update",
  async ({ invoiceId, requestBody }: any, { rejectWithValue }) => {
    try {
      const data = await apiServices.put(`/invoice/${invoiceId}`, requestBody);

      return { invoiceId, requestBody };
    } catch (error: any) {
      console.log("error while updating invoice data", error.message);
      return rejectWithValue({ message: error?.message });
    }
  }
);
