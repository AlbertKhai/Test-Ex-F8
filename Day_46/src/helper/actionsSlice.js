import { loadingSlice } from "../redux/slice/loadingSlice";
export const { loadingOn, loadingOff } = loadingSlice.actions;

import { toastSlice } from "../redux/slice/toastSlice";
export const { toastAdd, toastRemove } = toastSlice.actions;

import { cartSlice } from "../redux/slice/cartSlice";
export const { cartAdd, cartRemove, cartPay, cartIn, cartDe, cartUpdate } = cartSlice.actions;
