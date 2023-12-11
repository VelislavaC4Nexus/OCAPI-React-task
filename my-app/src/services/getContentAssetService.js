export const postOrder = async (contentAssetId ) => {
    const urlPostPaymentInstrument = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetId}`;
    let contentAssetData;

    try {
        const response = await fetch(urlPostPaymentInstrument, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token'),
            },
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        contentAssetData = { ...data };
    } catch (error) {
        throw new Error(error);
    }

    return contentAssetData;
};