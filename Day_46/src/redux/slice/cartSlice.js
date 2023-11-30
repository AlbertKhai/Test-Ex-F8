import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   list: JSON.parse(localStorage.getItem("cart")) ?? [],
   empty: !JSON.parse(localStorage.getItem("cart"))?.length,
   total: 0,
};

export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      cartAdd: (state, action) => {
         let hasProduct = false;
         const newCart = state.list.map((product) => {
            if (product.id === action.payload.id) {
               hasProduct = true;
               product.quantity += 1;
            }
            return product;
         });

         if (!hasProduct) {
            action.payload.quantity = 1;
            newCart.push(action.payload);
         }

         localStorage.setItem("cart", JSON.stringify(newCart));
         state.list = newCart;
         state.empty = false;
      },

      cartUpdate: (state, action) => {
         const newCart = state.list.map((product) => {
            if (product.id === action.payload.id) {
               product.quantity = action.payload.quantity;
            }
            return product;
         });

         localStorage.setItem("cart", JSON.stringify(newCart));
         state.list = newCart;
         state.empty = false;
      },

      cartIn: (state, action) => {
         const newCart = state.list.map((product) => {
            if (product.id === action.payload.id && product.quantity < action.payload.inventory) {
               product.quantity += 1;
            }
            return product;
         });

         localStorage.setItem("cart", JSON.stringify(newCart));
         state.list = newCart;
      },

      cartDe: (state, action) => {
         const newCart = state.list.map((product) => {
            if (product.id === action.payload && product.quantity > 1) {
               product.quantity -= 1;
            }
            return product;
         });

         localStorage.setItem("cart", JSON.stringify(newCart));
         state.list = newCart;
      },

      cartRemove: (state, action) => {
         const newCart = state.list.filter((item) => item.id !== action.payload);
         localStorage.setItem("cart", JSON.stringify(newCart));
         state.list = newCart;
         if (!newCart.length) {
            state.empty = true;
         }
      },

      cartPay: (state) => {
         localStorage.setItem("cart", JSON.stringify([]));
         state.list = [];
         state.empty = true;
      },
   },
});
