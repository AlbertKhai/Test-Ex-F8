import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import { getProducts } from "../../redux/middleWares/productMiddleWare";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
   const dispatch = useDispatch();
   const productList = useSelector(({ product }) => product.list);
   const navigate = useNavigate();
   const [state, setState] = useState({
      limit: import.meta.env.VITE_PAGE_LIMIT,
      page: 1,
   });

   useEffect(() => {
      dispatch(getProducts(state));
   }, [state.page]);

   return (
      <div className="product">
         <h1 className="product-title">PRODUCT</h1>
         <ul className="product-list">
            {productList.map((product) => (
               <ProductItem key={product._id} product={product} />
            ))}
         </ul>
         <nav className="product-pagination">
            <button className="btn__prev-page" onClick={() => setState({ ...state, page: state.page - 1 })}>
               <span className="text">Trang trước</span>
            </button>
            <button className="btn__next-page" onClick={() => setState({ ...state, page: state.page + 1 })}>
               <span className="text">Trang sau</span>
            </button>
         </nav>
      </div>
   );
};

export default Products;
