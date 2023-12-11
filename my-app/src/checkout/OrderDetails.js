import { useCartContext } from "../contexts/CartContext";
import ProductTile from "../cart/ProductTile";
import { postOrder } from "../services/checkoutService";
import { useNavigate } from "react-router-dom";
import ProductTileCheckout from "./ProductTileCheckout";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { cart, setCart, setOrder } = useCartContext();
    const basketId = cart?.basket_id;
    console.log(cart);

    const placeOrderHandler = async () => {
        const responsePostOrder = await postOrder(basketId);
        localStorage.removeItem('basket');
        setCart('');
        // setNumberOfCartItems(0);
        setOrder(responsePostOrder);
        navigate('/order');
    };

    if (cart?.product_items.length) {
        return <>
            <h2>Cart: </h2>
            <div>{cart.product_items.map(item => <ProductTileCheckout item={item} key={item.item_id} />)}</div>
            <div>Shipping method:{cart.shipments[0].shipping_method.description}</div>
            <div>Shipping method price:{cart.shipments[0].shipping_method.price}</div>
            <h2>Sipping Address: </h2>

            <div>Address: {cart.shipments[0].shipping_address.address1}</div>
            <div>City: {cart.shipments[0].shipping_address.address1}</div>
            <div>Country Code: {cart.shipments[0].shipping_address.country_code}</div>
            <div>Postal Code: {cart.shipments[0].shipping_address.postal_code}</div>
            <div>State Code: {cart.shipments[0].shipping_address.state_code}</div>
            <div>Full Name: {cart.shipments[0].shipping_address.full_name}</div>
            <div>Phone Number: {cart.shipments[0].shipping_address.phone}</div>

            <h2>Payment</h2>
            <div>Payment Card: {cart.payment_instruments[0].payment_card.card_type}</div>
            <h2>Final Price: {cart.order_total} {cart.currency}</h2>

            <button onClick={placeOrderHandler}>Place Order</button>
        </>;

    }
    return <p>no products in the cart</p>;
};

export default OrderDetails;