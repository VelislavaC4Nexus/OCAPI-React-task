import useFetch from "../hooks/useFetch";
import { getContentAssetUrl } from "../utils/urlEndpoints";
const Footer = () => {
    const contentAssetFooterLocateStore = 'footer-locate-store';
    const contentAssetFooterAccount = 'footer-account';
    const contentAssetFooterSupport = 'footer-support';
    const contentAssetFooterAbout = 'footer-about';

    // const urlGetContentAssetLocateStrore = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterLocateStore}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    // const urlGetContentAssetAccount = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterAccount}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    // const urlGetContentAssetSupport = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterSupport}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
    // const urlGetContentAssetAbout = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/content/${contentAssetFooterAbout}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };
    const { data: dataLocateStrore } = useFetch(getContentAssetUrl(contentAssetFooterLocateStore), options);
    const { data: dataAccount } = useFetch(getContentAssetUrl(contentAssetFooterAccount), options);
    const { data: dataSupportt } = useFetch(getContentAssetUrl(contentAssetFooterSupport), options);
    const { data: dataAbout } = useFetch(getContentAssetUrl(contentAssetFooterAbout), options);

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