import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

import toVND from "../../utils/toCurrency";
import { cartPay, toastAdd } from "../../helper/actionsSlice";

const Cart = () => {
   const cart = useSelector(({ cart }) => cart.list);
   const [state, setState] = useState({ hide: "hide", off: false, pay: false });
   const { hide, off, pay } = state;
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const totalAmount = cart.reduce((prev, product) => (prev += +product.quantity * +product.price), 0);

   const handleHideCart = () => {
      setState({ hide: "hide", off: true, pay: false });
   };

   const handlePay = async () => {
      setState({ hide: "hide", off: true, pay: true });
      dispatch(toastAdd({ mess: "Bạn đã thanh toán thành công", type: "success" }));
   };

   useEffect(() => {
      setState({ ...state, hide: "" });
   }, []);

   useEffect(() => {
      if (off) {
         setTimeout(function () {
            navigate(-1);
         }, 300);
      }

      if (pay) {
         dispatch(cartPay());
      }
   }, [off, pay]);

   return (
      <div className={`cart ${hide}`}>
         {cart.length ? (
            <div className="cart-inner">
               <header className="cart-header">
                  <div className="cart-title">Tên sản phẩm</div>
                  <div className="cart-title quantity">Số lượng</div>
                  <div className="cart-title">Giá tiền</div>
                  <div className="cart-title">Thành tiền</div>
                  <div className="cart-title inventory">Sản phẩm có sẵn</div>
               </header>
               <ul className="cart-list">
                  {cart.map((product) => {
                     return <CartItem key={product.id} product={product} onHandleHideCart={handleHideCart} />;
                  })}
               </ul>
               <footer className="cart-footer">
                  <div className="cart-title">Tổng tiền</div>
                  <div className="cart__total-amount">{toVND(totalAmount)}</div>
                  <div className="cart-wrap__btn-pay">
                     <button onClick={handlePay} className="cart-btn__pay">
                        <span className="text">Thanh toán</span>
                     </button>
                  </div>
               </footer>
            </div>
         ) : (
            <div className="cart-inner">
               <p className="cart-empty">Giỏ hàng trống</p>
            </div>
         )}
         <div onClick={handleHideCart} className="cart__overlay"></div>
      </div>
   );
};

export default Cart;
