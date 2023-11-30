import { configureStore } from "@reduxjs/toolkit";
import { toastSlice } from "./slice/toastSlice";
import { loadingSlice } from "./slice/loadingSlice";
import { productSlice } from "./slice/productSlice";
import { cartSlice } from "./slice/cartSlice";

export const store = configureStore({
   reducer: {
      product: productSlice.reducer,
      cart: cartSlice.reducer,
      toast: toastSlice.reducer,
      loading: loadingSlice.reducer,
   },
});
