import { useNavigate, Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import ProductTile from "./ProductTile";

const Cart = () => {
    const { cart } = useCartContext();
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };
    if (cart && cart.product_items) {
        return <>
            <h3 className="fw-bold">Your Cart</h3>
            <div className="pb-3">{cart.product_items.map(item => <ProductTile item={item} key={item.item_id} />)}</div>
            <button className="btn btn-primary" onClick={goToCheckoutHandler}>Go to Checkout</button>
        </>;
    }
    return (
        <>
            <p className="fw-bold">Your cart is empty! </p>
            <Link to="/sony-ps3-bundleM">Choose product</Link>
        </>
    );
};

export default Cart;