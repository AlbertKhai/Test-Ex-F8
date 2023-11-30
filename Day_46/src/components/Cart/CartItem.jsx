import toVND from "../../utils/toCurrency";
import { useSelector, useDispatch } from "react-redux";
import { toastAdd } from "../../helper/actionsSlice";
import { cartRemove, cartUpdate, cartDe, cartIn } from "../../helper/actionsSlice";
import { validQty } from "../../utils/validate";

const CartItem = (props) => {
   const { id, name, quantity, price, inventory } = props.product;
   const cart = useSelector(({ cart }) => cart.list);
   const dispatch = useDispatch();

   const removeCart = () => {
      if (cart.length === 1) {
         props.onHandleHideCart();
      }
      setTimeout(() => {
         dispatch(cartRemove(id));
         dispatch(toastAdd({ mess: `Đã bỏ sản phẩm ${action.payload.name} ra khỏi giỏ hàng`, type: "success" }));
      }, 300);
   };

   const handleRemoveCart = () => {
      dispatch(
         toastAdd({
            mess: `Bấm vào đây nếu bạn chắc chắn bỏ sản phẩm\n ${name} khỏi giỏ hàng`,
            type: "warning",
            confirm: removeCart,
         })
      );
   };

   const handleInput = (e) => {
      const value = validQty(e.target.value, inventory);
      dispatch(cartUpdate({ id, quantity: value }));
   };

   return (
      <li className="cart-item">
         <div className="cart-name">{name}</div>
         <div className="cart-quantity">
            <button onClick={() => dispatch(cartDe(id))} className="number-left"></button>
            <input onInput={handleInput} type="number" value={quantity} className="cart__input-quantity" />
            <button onClick={() => dispatch(cartIn({ id, inventory }))} className="number-right"></button>
         </div>
         <div className="cart-price">{toVND(price)}</div>
         <div className="cart-price__total">{toVND(quantity * price)}</div>
         <div className="cart-inventory">{inventory - quantity}</div>
         <div className="cart-wrap__btn-del">
            <button onClick={handleRemoveCart} className="cart-btn__del">
               <i className="fa-solid fa-xmark"></i>
            </button>
         </div>
      </li>
   );
};

export default CartItem;
