import { createShippingBillingAddressBody, createPaymentInstrumentBody } from "../utils/createBody";
import { CREATE_ORDER, getAddBillingAddresToBasketUrl, getAddPaymentInstrumentToBasketUrl, getAddShippingAddresToBasketUrl, getShipmentMethodsUrl } from "../utils/urlEndpoints";

export const addShippingAddress = async (basketId, shipmentId, formData) => {
    const body = createShippingBillingAddressBody(formData);
    const urlAddShippingAddress = getAddShippingAddresToBasketUrl(basketId, shipmentId);
    let formresponse;

    try {
        const response = await fetch(urlAddShippingAddress, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify(body)
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

export const putShippingMethod = async (basketId, shipmentId, shippingMethodId) => {

    const urlGetShipmentMethod = getShipmentMethodsUrl(basketId,shipmentId);
    let shipmentMethods;

    try {
        const response = await fetch(urlGetShipmentMethod, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify({ "id": shippingMethodId.toString() })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        shipmentMethods = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return shipmentMethods;
};

export const putBillingAddress = async (basketId, formData) => {
    const body = createShippingBillingAddressBody(formData);

    const urlPutBillingAddress = getAddBillingAddresToBasketUrl(basketId);
    let responseBillingAddress;

    try {
        const response = await fetch(urlPutBillingAddress, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        responseBillingAddress = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return responseBillingAddress;
};
export const postPaymentInstrument = async (basketId, formData) => {
    const body = createPaymentInstrumentBody(formData);

    const urlPostPaymentInstrument = getAddPaymentInstrumentToBasketUrl(basketId);
    let responsePaymentInstrument;

    try {
        const response = await fetch(urlPostPaymentInstrument, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        responsePaymentInstrument = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return responsePaymentInstrument;
};

export const postOrder = async (basketId,) => {
    let responsePostOrder;

    try {
        const response = await fetch(CREATE_ORDER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify({ "basket_id": basketId })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        responsePostOrder = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return responsePostOrder;
};

