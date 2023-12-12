import { CREATE_BASKET, getAddProductToBasketUrl, getBasketUrl, getRemoveProductToBasketUrl } from "../utils/urlEndpoints";

export const removeItemFromBasket = async (basketId, productId) => {

    const urlAddShippingAddress = getRemoveProductToBasketUrl(basketId, productId);
    let formresponse;

    try {
        const response = await fetch(urlAddShippingAddress, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        formresponse = { ...data };
    } catch (error) {
        throw new Error(error);
    }
    return formresponse;
};

export const addProductToBasket = async (basketId, productData) => {
    const urlAddItemToBasket = getAddProductToBasketUrl(basketId);

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
            throw new Error('Something went wrong!');
        }

        const data = await response.json();
        basketWithItem = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return basketWithItem;
};

export const createBasket = async () => {
    let createdBasketData;
    try {
        const response = await fetch(CREATE_BASKET, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await response.json();
        createdBasketData = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return createdBasketData;
};
export const getExistingBasket = async (basketId) => {
    let basketData;
    try {
        const response = await fetch(getBasketUrl(basketId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const data = await response.json();
        basketData = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return basketData;
};

