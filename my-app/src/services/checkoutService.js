export const addShippingAddress = async (basketId, shipmentId, formData) => {
    const body = {
        "address1": formData.address,
        "city": formData.city,
        "state_code": formData.stateCode,
        "postal_code": formData.postalCode,
        "country_code": formData.countryCode,
        "first_name": formData.firstName,
        "last_name": formData.lastName,
        "phone": formData.phoneNumber
    };
    const urlAddShippingAddress = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/shipments/${shipmentId}/shipping_address`;
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
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        formresponse = { ...data };
    } catch (error) {
        throw new Error(error);
    }
    return formresponse;
};

export const putShippingMethod = async (basketId, shipmentId, shippingMethodId) => {

    const urlGetShipmentMethod = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/shipments/${shipmentId}/shipping_method`;
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
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        shipmentMethods = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return shipmentMethods;
};
export const putBillingAddress = async (basketId, formData) => {
    const body = {
        "address1": formData.address,
        "city": formData.city,
        "state_code": formData.stateCode,
        "postal_code": formData.postalCode,
        "country_code": formData.countryCode,
        "first_name": formData.firstName,
        "last_name": formData.lastName,
        "phone": formData.phoneNumber
    };

    const urlPutBillingAddress = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/billing_address`;
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
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseBillingAddress = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return responseBillingAddress;
};
export const postPaymentInstrument = async (basketId, formData) => {
    const body = {
        "payment_card": {
            "card_type": formData.cardType,
            "number": formData.cardNumber,
            "security_code": formData.securityCode,
            "expiration_month": formData.expirationMonth,
            "expiration_year": formData.expirationYear,
        },
        "payment_method_id": formData.paymentMethod
    };

    const urlPostPaymentInstrument = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/payment_instruments`;
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
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responsePaymentInstrument = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return responsePaymentInstrument;
};
export const postOrder = async (basketId, ) => {
    // const body = {
    //     "payment_card": {
    //         "card_type": formData.cardType,
    //         "number": formData.cardNumber,
    //         "security_code": formData.securityCode,
    //         "expiration_month": formData.expirationMonth,
    //         "expiration_year": formData.expirationYear,
    //     },
    //     "payment_method_id": formData.paymentMethod
    // };

    const urlPostPaymentInstrument = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/orders`;
    let responsePostOrder;

    try {
        const response = await fetch(urlPostPaymentInstrument, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
            body: JSON.stringify({"basket_id": basketId})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responsePostOrder = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return responsePostOrder;
};

