import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";

const basketExists = () => localStorage.getItem('basket') !== null;

const AddToCartBtn = ({ selectedProduct, quantity, isOrderable }) => {
    const { cart, setCart} = useCartContext();

    useEffect(() => {
        if (basketExists()) {
            setCart((JSON.parse(localStorage.getItem('basket'))));
        }

    }, []

    );
    console.log(cart, "cart");
    console.log(cart, 'cart');
    console.log(Array.isArray(cart), 'cart');

    const addToCartHandler = async () => {
        let checkCart;
        let basketId;
        // const existingBasket =  localStorage.getItem('basket');

        // if(existingBasket){
        //     setCart((JSON.parse(localStorage.getItem('basket'))))
        // }

        // console.log(existingBasket,'existingBasket');
        if (!basketExists()) {
            const newBasket = await createBasket();
            localStorage.setItem('basket', JSON.stringify(newBasket));
            console.log(newBasket, 'newBasket');
            console.log(JSON.parse(localStorage.getItem('basket')), 'SSSS');

        }
        //const basketId = cart.length > 0 ? cart.basket_id : checkCart.basket_id;
        // setBasketId(basketId);

        const productData = [
            {
                product_id: selectedProduct,
                quantity: Number(quantity)
            }
        ];
        const newItemToBasket = await addProductToBasket(JSON.parse(localStorage.getItem('basket')).basket_id, productData);
        localStorage.setItem('basket', JSON.stringify(newItemToBasket));
        console.log(JSON.parse(localStorage.getItem('basket')), 'ITEMINBASKET');
        console.log('newItemToBasket', newItemToBasket);
        setCart(newItemToBasket);
    };

    const addProductToBasket = async (basketId, productData) => {
        console.log(basketId, 'addProductToBasket');
        console.log("productData", productData);
        const urlAddItemToBasket = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/items`;

        const token = localStorage.getItem('token');
        let basketWithItem;

        try {
            const response = await fetch(urlAddItemToBasket, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token'),
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            basketWithItem = { ...data };
        } catch (error) {
            throw new Error(error);
        }

        console.log('basketWithItem', basketWithItem);
        return basketWithItem;
    };

    const createBasket = async () => {
        const urlCreateBasket = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets`;
        const token = localStorage.getItem('token');
        let createdBasketData;

        try {
            const response = await fetch(urlCreateBasket, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token'),
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            createdBasketData = { ...data };
        } catch (error) {
            throw new Error(error);
        }

        console.log('createdBasketData', createdBasketData);
        return createdBasketData;
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