import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { postOrder } from "../services/checkoutService";
import ProductTileCheckout from "./ProductTileCheckout";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { cart, setOrder, setCart } = useCartContext();
    const basketId = cart?.basket_id;

    const placeOrderHandler = async () => {
        const responsePostOrder = await postOrder(basketId);
        localStorage.removeItem('basket');
        setOrder(responsePostOrder);
        setCart({});
        navigate('/order');
    };

    if (cart?.product_items.length) {
        return <>
            <h3>Your Cart</h3>
            <div>{cart.product_items.map(item => <ProductTileCheckout item={item} key={item.item_id} />)}</div>

            <h3 className="pt-2">Sipping Method</h3>
            <p><span className="fw-bold">Shipping method: </span>{cart.shipments[0].shipping_method.description}</p>
            <p><span className="fw-bold">Shipping method price: </span>{cart.shipments[0].shipping_method.price}</p>
            <h3 className="pb-2">Sipping Address</h3>
            <p><span className="fw-bold">Address: </span>{cart.shipments[0].shipping_address.address1}</p>
            <p><span className="fw-bold">City: </span>{cart.shipments[0].shipping_address.address1}</p>
            <p><span className="fw-bold">Country Code: </span>{cart.shipments[0].shipping_address.country_code}</p>
            <p><span className="fw-bold">Postal Code: </span>{cart.shipments[0].shipping_address.postal_code}</p>
            <p><span className="fw-bold">State Code: </span>{cart.shipments[0].shipping_address.state_code}</p>
            <p><span className="fw-bold">Full Name: </span>{cart.shipments[0].shipping_address.full_name}</p>
            <p><span className="fw-bold">Phone Number: </span>{cart.shipments[0].shipping_address.phone}</p>

            <h3>Payment</h3>
            <p><span className="fw-bold">Payment Card: </span>{cart.payment_instruments[0].payment_card.card_type}</p>
            <h3>Final Price: {cart.order_total} {cart.currency}</h3>

            <button className="btn btn-primary" onClick={placeOrderHandler}>Place Order</button>
        </>;
    }
    return <p>no products in the cart</p>;
};

export default OrderDetails;