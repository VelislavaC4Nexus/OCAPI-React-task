import { useCartContext } from "../contexts/CartContext";
import {
    productIdConstant,
    productName,
    productQuantity,
    singlePrice,
    tottalPriceAfterDiscount
} from "../utils/contentConstants";

const ProductTileCheckout = ({ item }) => {
    const { cart } = useCartContext();
    return (
        <div className="row border-bottom border-primary p-12">
            <div className="col-5">
                <p><span className="fw-bold">{productIdConstant} </span> {item.product_id}</p>
                <p><span className="fw-bold">{productName} </span> {item.product_name}</p>
                <p><span className="fw-bold">{productQuantity} </span>{item.quantity}</p>
                <p><span className="fw-bold">{singlePrice} </span> {item.base_price} {cart.currency}</p>
                <p><span className="fw-bold">{tottalPriceAfterDiscount} </span> {item.price_after_item_discount} {cart.currency}</p>
            </div>
        </div >
    );

};
export default ProductTileCheckout;