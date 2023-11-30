import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   status: "hide",
};

export const loadingSlice = createSlice({
   name: "loading",
   initialState,
   reducers: {
      loadingOn: (state) => {
         state.status = "";
      },
      loadingOff: (state) => {
         console.log("off");
         state.status = "hide";
      },
   },
});
