import { useEffect, createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('basket')));
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    console.log(numberOfCartItems);

    useEffect(() => {
        if (cart && cart.product_items?.length) {
            // cart.product_items.map(item=>item.quntity)
            const totalQuantity = cart.product_items.reduce((acc, item) => acc + item.quantity, 0);
            setNumberOfCartItems(totalQuantity);
        }

    }, [cart]);
    console.log(cart);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                numberOfCartItems,
                setNumberOfCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};