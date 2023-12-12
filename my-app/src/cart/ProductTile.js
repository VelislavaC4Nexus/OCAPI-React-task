import { useCartContext } from "../contexts/CartContext";
import { removeItemFromBasket } from "../services/cartService";

const ProductTile = ({ item }) => {
    const { cart, setCart } = useCartContext();
    const basketId = cart?.basket_id;
    const removeItemHandler = async (productId) => {
        const responseRemoveItemFromBasket = await removeItemFromBasket(basketId, productId);
        localStorage.setItem('basket', JSON.stringify(responseRemoveItemFromBasket));
        setCart(responseRemoveItemFromBasket);
    };
    return (
        <>
            <div className="row border-bottom border-primary p-3">
                <div className="col-5">
                    <p><span className="fw-bold">Product id:</span> {item.product_id}</p>
                    <p><span className="fw-bold">Product name:</span> {item.product_name}</p>
                    <p><span className="fw-bold">Product quantity: </span>{item.quantity}</p>
                    <p><span className="fw-bold">Single price:</span> {item.base_price} {cart.currency}</p>
                    <p><span className="fw-bold">Total price after discoutn:</span> {item.price_after_item_discount} {cart.currency}</p>
                </div>
                <div className="col-6">
                    <button className="btn btn-danger" onClick={() => removeItemHandler(item.item_id)}>Remove Item</button>
                </div>
            </div>
        </>
    );

};
export default ProductTile;