import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../middleWares/productMiddleWare";
import { getProductDetails } from "../middleWares/productDetailsMiddleWare";

const initialState = {
   list: [],
   status: "idle",
   details: {},
   detailsStatus: "idle",
};
export const productSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
      productAdd: (state, action) => {
         state.list = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getProducts.pending, (state) => {
         state.status = "pending";
      });
      builder.addCase(getProducts.fulfilled, (state, action) => {
         state.list = action.payload;
         state.status = "success";
      });
      builder.addCase(getProducts.rejected, (state) => {
         state.status = "error";
      });

      builder.addCase(getProductDetails.pending, (state) => {
         state.detailsStatus = "pending";
      });
      builder.addCase(getProductDetails.fulfilled, (state, action) => {
         state.details = action.payload;
         state.detailsStatus = "success";
      });
      builder.addCase(getProductDetails.rejected, (state) => {
         state.detailsStatus = "error";
      });
   },
});
