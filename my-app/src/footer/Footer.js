import useFetch from "../hooks/useFetch";
const Footer = () => {
    const contentAssetFooterLocateStore = 'footer-locate-store';
    const contentAssetFooterAccount = 'footer-account';
    const contentAssetFooterSupport = 'footer-support';
    const contentAssetFooterAbout = 'footer-about';

    const urlGetContentAssetLocateStrore = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterLocateStore}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    const urlGetContentAssetAccount = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterAccount}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    const urlGetContentAssetSupport = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterSupport}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    const urlGetContentAssetAbout = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterAbout}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };
    const { data: dataLocateStrore, isLoading: isLoadingLocateStrore } = useFetch(urlGetContentAssetLocateStrore, options);
    const { data: dataAccount, isLoading: isLoadingAccount } = useFetch(urlGetContentAssetAccount, options);
    const { data: dataSupportt, isLoading: isLoadingSupport } = useFetch(urlGetContentAssetSupport, options);
    const { data: dataAbout, isLoading: isLoadingAbout } = useFetch(urlGetContentAssetAbout, options);

    // console.log(data);
    if (dataLocateStrore && dataLocateStrore.c_body && 
        dataAccount && dataAccount.c_body && 
        dataSupportt && dataSupportt.c_body &&
        dataAbout && dataAbout.c_body) {
        // const body = data.c_body;
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: dataLocateStrore.c_body }}></div>
                <div dangerouslySetInnerHTML={{ __html: dataAccount.c_body }}></div>
                <div dangerouslySetInnerHTML={{ __html: dataSupportt.c_body }}></div>
                <div dangerouslySetInnerHTML={{ __html: dataAbout.c_body }}></div>
            </>);
    }
    return (
        <div >Footer</div>
    );
};
export default Footer;