import {  createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('basket')));
    const [order, setOrder] = useState(null);

    let totalQuantity;
    if (cart && cart.product_items?.length) {
        totalQuantity = cart.product_items.reduce((acc, item) => acc + item.quantity, 0);
    } else {
        totalQuantity = 0;
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                totalQuantity,
                order,
                setOrder
            }}
        >
            {children}
        </CartContext.Provider>
    );
};