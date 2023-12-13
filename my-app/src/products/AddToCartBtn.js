import { useCartContext } from "../contexts/CartContext";
import { addProductToBasket, getExistingBasket } from "../services/cartService";
import { createBasket } from "../services/cartService";
import { addToCartBtn, productIsNotAvailable } from "../utils/contentConstants";


const AddToCartBtn = ({ selectedProduct, quantity, isOrderable }) => {
    const { setCart } = useCartContext();

    const basketExists = () => localStorage.getItem('basket') !== null;

    const addToCartHandler = async () => {
        let basket;
        if (!basketExists()) {
            basket = await createBasket();
            localStorage.setItem('basket', JSON.stringify(basket.basket_id));
        } else {
            basket = await getExistingBasket(JSON.parse(localStorage.getItem('basket')).toString());
        }
        const productData = [
            {
                product_id: selectedProduct,
                quantity: Number(quantity)
            }
        ];
        const newItemToBasket = await addProductToBasket(JSON.parse(localStorage.getItem('basket')), productData);
        setCart(newItemToBasket);
    };

    if (selectedProduct) {
        if (isOrderable) {
            return <button className="btn btn-primary" onClick={addToCartHandler}>{addToCartBtn}</button>;
        }
        return <p>{productIsNotAvailable}</p>;
    } else {
        return <button className="btn btn-primary" onClick={addToCartHandler} disabled>{addToCartBtn}</button>;
    }
};

export default AddToCartBtn;