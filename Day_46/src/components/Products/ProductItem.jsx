import { useState } from "react";
import toVND from "../../utils/toCurrency";
import { useDispatch } from "react-redux";
import { toastAdd, cartAdd } from "../../helper/actionsSlice";
import { useNavigate } from "react-router-dom";
import { toUrlFriendly } from "../../utils/toUrlFriendly";

const ProductItem = (props) => {
   const { _id: id, name, price, image, quantity: inventory } = props.product;
   const [isImageLoaded, setImageLoaded] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleAddCart = () => {
      dispatch(
         toastAdd({
            mess: `Bạn đã thêm sản phẩm ${name}\n thành công vào giỏ hàng`,
            type: "success",
         })
      );
      dispatch(cartAdd({ id, name, price, inventory }));
   };

   const handleImageLoad = () => {
      setImageLoaded(true);
   };

   const handleToDetails = () => {
      const nameUrl = toUrlFriendly(name);
      navigate(`/details/${nameUrl}/${id}`);
   };

   return (
      <li className="product-item">
         <figure onClick={handleToDetails} className={`product-thumb ${isImageLoaded ? "no-animation" : ""}`}>
            <img src={image} alt={name} className="product-img" onLoad={handleImageLoad} />
         </figure>
         <div className="product-content">
            <p onClick={handleToDetails} className="product-name" to={"/details"}>
               {name}
            </p>
            <div className="product-action">
               <span className="product-price">{toVND(price)}</span>
               <button onClick={handleAddCart} className="product-btn__add">
                  <span className="text">Thêm vào giỏ</span>
               </button>
            </div>
         </div>
      </li>
   );
};

export default ProductItem;
