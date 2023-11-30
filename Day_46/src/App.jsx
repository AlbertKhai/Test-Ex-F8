import React from "react";
import Layout from "./core/Layout";
import Toasts from "./components/Toasts/Toasts";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
   return (
      <div className="shop">
         <ScrollToTop />
         <Layout />
         <Toasts />
         <Loading />
      </div>
   );
};

export default App;
