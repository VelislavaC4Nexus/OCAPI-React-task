import Loading from "../components/Loading";
import { useCartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import { getContentAssetUrl } from "../utils/urlEndpoints";

const Order =()=>{
    const {order} =useCartContext();
    const contentAssetId ='v_CA_FEtask_order_message_success'
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };

    const {data, isLoading}=useFetch(getContentAssetUrl(contentAssetId),options);
    let thankYouMessage
    if(data && data.c_body){
        thankYouMessage = data.c_body.replace(/\$\{order ID\}/,order.order_no).replace(/\$\{order total\}/,`${order.order_total} ${order.currency}`);
    }

    if(isLoading){
        return <Loading/>
    }
    if(thankYouMessage){
        return<div>{thankYouMessage}</div>
    }
}

export default Order;