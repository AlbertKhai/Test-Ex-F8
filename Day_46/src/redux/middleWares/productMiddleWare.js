import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../utils/client";
import { loadingOn, loadingOff } from "../../helper/actionsSlice";

export const getProducts = createAsyncThunk("getProducts", async (query = {}, { dispatch }) => {
   dispatch(loadingOn());
   let queryString = new URLSearchParams(query).toString();
   queryString = queryString ? "?" + queryString : "";
   const { data } = await client.get(`/products${queryString}`);
   dispatch(loadingOff());
   return data.data.listProduct;
});
