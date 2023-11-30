import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/imgs/logo_K.png";
import { Link, useNavigate } from "react-router-dom";

import { toastAdd } from "../helper/actionsSlice";

const Header = () => {
   const cartEmpty = useSelector(({ cart }) => cart.empty);
   const cart = useSelector(({ cart }) => cart.list);
   const totalCart = cart.reduce((prev, product) => (prev += +product.quantity), 0);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleShowCart = () => {
      if (cartEmpty) {
         dispatch(toastAdd({ mess: "Bạn chưa có sản phẩm nào trong giỏ hàng 🤔", type: "warning" }));
         return;
      }
      navigate("/cart");
   };

   return (
      <header className="header">
         <figure className="wrap__logo">
            <Link to="/">
               <img src={logo} alt="logo-shop" className="logo" />
            </Link>
         </figure>
         <div className="wrap__btn-cart">
            <span className="total-product">{totalCart}</span>
            <button onClick={handleShowCart} className="header-btn__show-cart">
               <span className="text">🛒</span>
            </button>
         </div>
      </header>
   );
};

export default Header;
