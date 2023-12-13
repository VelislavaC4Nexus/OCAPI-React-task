export const createShippingBillingAddressBody = (formData) => {
    return {
        "address1": formData.address,
        "city": formData.city,
        "state_code": formData.stateCode,
        "postal_code": formData.postalCode,
        "country_code": formData.countryCode,
        "first_name": formData.firstName,
        "last_name": formData.lastName,
        "phone": formData.phoneNumber
    };
};

export const createPaymentInstrumentBody = (formData) => {
    return {
        "payment_card": {
            "card_type": formData.cardType,
            "number": formData.cardNumber,
            "security_code": formData.securityCode,
            "expiration_month": formData.expirationMonth,
            "expiration_year": formData.expirationYear,
        },
        "payment_method_id": formData.paymentMethod
    };
};