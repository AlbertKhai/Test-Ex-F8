import { createAsyncThunk } from "@reduxjs/toolkit";

import client from "../../utils/client";

export const getProductDetails = createAsyncThunk("getProductDetails", async (id, { dispatch }) => {
   const { data } = await client.get(`/products/${id}`);

   return data.data;
});
