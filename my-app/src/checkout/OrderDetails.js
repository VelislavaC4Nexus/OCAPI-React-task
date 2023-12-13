import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { postOrder } from "../services/checkoutService";
import ProductTileCheckout from "./ProductTileCheckout";
import { 
    address, 
    cartTitle, 
    city, 
    countryCode, 
    shippingAddressTitle, 
    shippingMethod, 
    shippingMethodPrice, 
    shippingMethodTitle,
    postalCode,
    stateCode,
    fullName,
    phoneNumber,
    paymentTitle,
    paymentCard,
    finalPrice,
    placeOrderBtn,
    noProductsInTheCart
 } from "../utils/contentConstants";

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
            <h3>{cartTitle}</h3>
            <div>{cart.product_items.map(item => <ProductTileCheckout item={item} key={item.item_id} />)}</div>

            <h3 className="pt-2">{shippingMethodTitle}</h3>
            <p><span className="fw-bold">{shippingMethod} </span>{cart.shipments[0].shipping_method.description}</p>
            <p><span className="fw-bold">{shippingMethodPrice} </span>{cart.shipments[0].shipping_method.price}</p>
            <h3 className="pb-2">{shippingAddressTitle}</h3>
            <p><span className="fw-bold">{address} </span>{cart.shipments[0].shipping_address.address1}</p>
            <p><span className="fw-bold">{city} </span>{cart.shipments[0].shipping_address.address1}</p>
            <p><span className="fw-bold">{countryCode} </span>{cart.shipments[0].shipping_address.country_code}</p>
            <p><span className="fw-bold">{postalCode} </span>{cart.shipments[0].shipping_address.postal_code}</p>
            <p><span className="fw-bold">{stateCode} </span>{cart.shipments[0].shipping_address.state_code}</p>
            <p><span className="fw-bold">{fullName} </span>{cart.shipments[0].shipping_address.full_name}</p>
            <p><span className="fw-bold">{phoneNumber} </span>{cart.shipments[0].shipping_address.phone}</p>

            <h3>{paymentTitle}</h3>
            <p><span className="fw-bold">{paymentCard} </span>{cart.payment_instruments[0].payment_card.card_type}</p>
            <h3>{finalPrice} {cart.order_total} {cart.currency}</h3>

            <button className="btn btn-primary" onClick={placeOrderHandler}>{placeOrderBtn}</button>
        </>;
    }
    return <p>{noProductsInTheCart}</p>;
};

export default OrderDetails;