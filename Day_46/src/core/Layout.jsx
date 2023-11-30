import React from "react";
import { Routes } from "react-router-dom";
import router from "../routers/router";

const Layout = () => {
   return <Routes>{router}</Routes>;
};

export default Layout;
