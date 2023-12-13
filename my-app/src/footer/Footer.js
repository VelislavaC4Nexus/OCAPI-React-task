import useFetch from "../hooks/useFetch";
import { getContentAssetUrl } from "../utils/urlEndpoints";
import './Footer.css';
const Footer = () => {
    const contentAssetFooterLocateStore = 'footer-locate-store';
    const contentAssetFooterAccount = 'footer-account';
    const contentAssetFooterSupport = 'footer-support';
    const contentAssetFooterAbout = 'footer-about';
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

    if (dataLocateStrore && dataLocateStrore.c_body &&
        dataAccount && dataAccount.c_body &&
        dataSupportt && dataSupportt.c_body &&
        dataAbout && dataAbout.c_body) {
        return (
            <footer className="d-flex align-items-center justify-content-around bg-dark text-light p-4">
                <div dangerouslySetInnerHTML={{ __html: dataLocateStrore.c_body }}></div>
                <div dangerouslySetInnerHTML={{ __html: dataAccount.c_body }}></div>
                <div dangerouslySetInnerHTML={{ __html: dataSupportt.c_body }}></div>
                <div dangerouslySetInnerHTML={{ __html: dataAbout.c_body }}></div>
            </footer>
        );
    }

};
export default Footer;