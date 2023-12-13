import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

const HeaderCartButton = (props) => {
  const { totalQuantity } = useCartContext();
  const navigate = useNavigate();

  const goToCartHandler = () => {
    navigate('/cart');
  };

  return (
    <button onClick={goToCartHandler} className="btn btn-primary m-2">
      <span >
        <i className='fa-solid fa-cart-shopping'></i>
      </span>
      <span > Your Cart  </span>
      <span className="rounded-circle bg-danger p-2 badge">{totalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;
