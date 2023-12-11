import { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import { addProductToBasket } from "../services/cartService";
import { createBasket } from "../services/cartService";

const basketExists = () => localStorage.getItem('basket') !== null;

const AddToCartBtn = ({ selectedProduct, quantity, isOrderable }) => {
    const { setCart } = useCartContext();

    useEffect(() => {
        if (basketExists()) {
            setCart((JSON.parse(localStorage.getItem('basket'))));
        }

    }, []);

    const addToCartHandler = async () => {
   
        if (!basketExists()) {
            const newBasket = await createBasket();
            localStorage.setItem('basket', JSON.stringify(newBasket));
        }

        const productData = [
            {
                product_id: selectedProduct,
                quantity: Number(quantity)
            }
        ];
        const newItemToBasket = await addProductToBasket(JSON.parse(localStorage.getItem('basket')).basket_id, productData);
        localStorage.setItem('basket', JSON.stringify(newItemToBasket));
        setCart(newItemToBasket);
    };
    
    if (selectedProduct) {
        if (isOrderable) {
            return <button onClick={addToCartHandler}>Add to Cart</button>;
        }
        return <p>Product is not available.</p>;
    } else {
        return <p>Select product.</p>;
    }
};

export default AddToCartBtn;