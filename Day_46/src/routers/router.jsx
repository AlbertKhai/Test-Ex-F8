import React from "react";
import { Route, Navigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Cart from "../components/Cart/Cart";
import ProductDetails from "../components/Products/ProductDetails";

const router = (
   <>
      <Route path="/" element={<DefaultLayout />}>
         <Route path="/cart" element={<Cart />}></Route>
         <Route path="/details/:name/:id" element={<ProductDetails />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
   </>
);

export default router;
