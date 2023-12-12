import { urlConstants } from "./urlConstants";

const BASE_URL = `${urlConstants().OCAPI_HOST}/s/${urlConstants().SITE}/${urlConstants().OCAPI_API}/${urlConstants().OCAPI_VERSION}`;

export const AUTH_URL = `${BASE_URL}/customers/auth`;

export const getProductUrl = (productId) => {
    return `${BASE_URL}/products/${productId}?client_id=${urlConstants().CLIENT_ID}&expand=images,prices,variations,availability,bundled_products`;
};

export const CREATE_BASKET = `${BASE_URL}/baskets`; 

export const getAddProductToBasketUrl = (basketId)=>{
    return `${BASE_URL}/baskets/${basketId}/items`
}
export const getRemoveProductToBasketUrl = (basketId,productId)=>{
    return `${BASE_URL}/baskets/${basketId}/items/${productId}`
}
export const getAddShippingAddresToBasketUrl = (basketId,shipmentId)=>{
    return `${BASE_URL}/baskets/${basketId}/shipments/${shipmentId}/shipping_address`
}
export const getShipmentMethodsUrl = (basketId,shipmentId)=>{
    return `${BASE_URL}/baskets/${basketId}/shipments/${shipmentId}/shipping_method`
}
export const getAddBillingAddresToBasketUrl = (basketId)=>{
    return `${BASE_URL}/baskets/${basketId}/billing_address`
}
export const getAddPaymentInstrumentToBasketUrl = (basketId)=>{
    return `${BASE_URL}/baskets/${basketId}/payment_instruments`
}
export const CREATE_ORDER = `${BASE_URL}/orders`; 

export const getPaymetMethodsUrl = (basketId)=>{
    return `${BASE_URL}/baskets/${basketId}/payment_methods`
}
export const getShippingMethodsUrl = (basketId,shipmentId)=>{
    return `${BASE_URL}/baskets/${basketId}/shipments/${shipmentId}/shipping_methods`
}
export const getContentAssetUrl = (contentAssetId)=>{
    return `${BASE_URL}/content/${contentAssetId}?client_id=${urlConstants().CLIENT_ID}`
}
export const getBasket = (basketId)=>{
    return `${BASE_URL}/baskets/${basketId}`
}




