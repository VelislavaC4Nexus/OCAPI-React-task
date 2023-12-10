import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import ProductTile from "./ProductTile";

const Cart = () => {
    const { cart } = useCartContext();
    const navigate = useNavigate()
    const goToCheckoutHandler=()=>{
navigate('/checkout')
    }
    // console.log(Array.isArray(cart.product_items), 'cart');
    if (cart?.product_items.length) {
        return <>
            <div>Cart</div>
            <div>{cart.product_items.map(item => <ProductTile item={item} key={item.item_id} />)}</div>
            {/* <div>{cart.product_items?.map(<ProductTile></ProductTile>)}</div>
    {cart.product_items.map(item=>{
        <ProductTile 
        key={item.item_id} 
       item={item} */}
            {/* /> */}
            {/* })} */}
            <button onClick={goToCheckoutHandler}>Go to Checkout</button>
        </>;

    }
    return <p>no products in the cart</p>;

    // (cart.product_items.map(item=>{
    //     <ProductTile 
    //     key={item.item_id} 
    //    item={item}
    //     />
    // })
    // );

};

export default Cart;