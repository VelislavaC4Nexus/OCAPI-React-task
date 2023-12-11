export const removeItemFromBasket = async (basketId, productId) => {
 
    const urlAddShippingAddress = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/items/${productId}`;
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