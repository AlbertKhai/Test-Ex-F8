import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Products from "../../components/Products/Products";

const DefaultLayout = () => {
   return (
      <div className="container">
         <Header />
         <main className="shop-inner">
            <Products />
            <Outlet />
         </main>
      </div>
   );
};

export default DefaultLayout;
