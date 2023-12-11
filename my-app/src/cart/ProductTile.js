import { useCartContext } from "../contexts/CartContext";
import { removeItemFromBasket } from "../services/cartService";

const ProductTile = ({ item }) => {
    const { cart,setCart } = useCartContext();
    const basketId = cart?.basket_id;
    const removeItemHandler =async(productId) => {
        console.log(productId);
         const responseRemoveItemFromBasket =await removeItemFromBasket(basketId,productId);
         console.log(responseRemoveItemFromBasket);
         localStorage.setItem('basket', JSON.stringify(responseRemoveItemFromBasket));
         setCart(responseRemoveItemFromBasket)

    };
    return (
        //<div>ProductTile</div>
        <>
            <p>Product id: {item.product_id}</p>
            <p>Product name: {item.product_name}</p>
            <p>Product quantity: {item.quantity}</p>
            <p>Single price: {item.base_price} {cart.currency}</p>
            <p>Total price after discoutn: {item.price_after_item_discount} {cart.currency}</p>
            <button onClick={() => removeItemHandler(item.item_id)}>Remove Item</button>
        </>
    );

};
export default ProductTile;