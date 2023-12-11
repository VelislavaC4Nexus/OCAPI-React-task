import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

const HeaderCartButton = (props) => {
const {totalQuantity}= useCartContext();
const navigate = useNavigate();

const goToCartHandler=()=>{
navigate('/cart');
}
  return (
    <button onClick={goToCartHandler} >
      <span >
        <i className='fa-solid fa-cart-shopping'></i>
      </span>
      <span>Your Cart</span>
      <span >{totalQuantity}</span>
    </button>
  );
}

export default HeaderCartButton;
