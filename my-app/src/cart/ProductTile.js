import { useCartContext } from "../contexts/CartContext";
import { removeItemFromBasket } from "../services/cartService";
import {
    productIdConstant,
    productName,
    productQuantity,
    removeItemBtn,
    singlePrice,
    tottalPriceAfterDiscount
} from "../utils/contentConstants";

const ProductTile = ({ item }) => {
    const { cart, setCart } = useCartContext();
    const basketId = cart?.basket_id;
    const removeItemHandler = async (productId) => {
        const responseRemoveItemFromBasket = await removeItemFromBasket(basketId, productId);
        setCart(responseRemoveItemFromBasket);
    };
    return (
        <>
            <div className="row border-bottom border-primary p-3">
                <div className="col-5">
                    <p><span className="fw-bold">{productIdConstant} </span> {item.product_id}</p>
                    <p><span className="fw-bold">{productName} </span> {item.product_name}</p>
                    <p><span className="fw-bold">{productQuantity} </span>{item.quantity}</p>
                    <p><span className="fw-bold">{singlePrice} </span> {item.base_price} {cart.currency}</p>
                    <p><span className="fw-bold">{tottalPriceAfterDiscount} </span> {item.price_after_item_discount} {cart.currency}</p>
                </div>
                <div className="col-6">
                    <button className="btn btn-danger" onClick={() => removeItemHandler(item.item_id)}>{removeItemBtn}</button>
                </div>
            </div>
        </>
    );

};
export default ProductTile;