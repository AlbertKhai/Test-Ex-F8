import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd, toastAdd } from "../../helper/actionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/middleWares/productDetailsMiddleWare";
import toVND from "../../utils/toCurrency";

const ProductDetails = () => {
   const [hide, setHide] = useState("hide");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const status = useSelector(({ product }) => product.detailsStatus);
   const {
      id,
      name,
      category,
      brand,
      price,
      quantity: inventory,
      image,
      description,
   } = useSelector(({ product }) => product.details);

   const handleAddCart = () => {
      dispatch(cartAdd({ id, name, price, inventory }));
      dispatch(
         toastAdd({
            mess: `Bạn đã thêm sản phẩm ${name}\n thành công vào giỏ hàng`,
            type: "success",
         })
      );
   };

   const handleHideDetails = () => {
      setHide("hide");
      setTimeout(function () {
         navigate(-1);
      }, 300);
   };
   const { id: idUrl } = useParams();

   useEffect(() => {
      setHide("");
      dispatch(getProductDetails(idUrl));
   }, []);

   return status === "success" ? (
      <div className={`product-detail ${hide}`}>
         <div className="product-detail__inner no-animation">
            <figure className="wrap__img-product">
               <img src={image} alt={name} className="img-product" />
            </figure>
            <div className="wrap__content">
               <h2 className="brand-product">{brand}</h2>
               <p className="name-product">{name}</p>
               <p className="desc-product">{description}</p>
               <div className="wrap__info">
                  <div className="info-left">
                     <h3 className="category-product">{category}</h3>
                     <button className="btn__home" onClick={() => navigate("/")}>
                        <span className="text">Về trang chủ</span>
                     </button>
                  </div>
                  <div className="info-right">
                     <span className="price-product">
                        <b>{toVND(price)}</b>
                     </span>
                     <button onClick={handleAddCart} className="btn__add-cart">
                        <span className="text">Thêm vào giỏ</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div onClick={handleHideDetails} className="overlay__product-detail"></div>
      </div>
   ) : (
      <div className={`product-detail ${hide}`}>
         <div className="product-detail__inner"></div>
         <div onClick={handleHideDetails} className="overlay__product-detail"></div>
      </div>
   );
};

export default ProductDetails;
