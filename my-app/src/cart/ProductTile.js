import { useCartContext } from "../contexts/CartContext";

const ProductTile = ({ item }) => {
const {cart}=useCartContext()
    return (
    //<div>ProductTile</div>
        <>
            <p>Product id: {item.product_id}</p>
            <p>Product name: {item.product_name}</p>
            <p>Product quantity: {item.quantity}</p>
            <p>Single price: {item.base_price} {cart.currency}</p>
            <p>Total price after discoutn: {item.price_after_item_discount} {cart.currency}</p>
        </>
    );

};
export default ProductTile;