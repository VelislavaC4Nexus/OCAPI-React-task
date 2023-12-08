import { useEffect, createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
console.log(numberOfCartItems);
//   useEffect(() => {
//     if (cart) {
//         setNumberOfCartItems(cart.product_items?.length || 0);
//     }
//   }, [cart]);

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