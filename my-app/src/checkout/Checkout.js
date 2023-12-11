import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import shippingFormValidationSchema from '../validations/shippingFormValidationSchema';
import { useCartContext } from '../contexts/CartContext';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import { putShippingMethod, addShippingAddress } from '../services/checkoutService';
import ShippingAddressForm from './ShippingAddressForm';
import { useState } from 'react';
import PaymentForm from './PaymentForm';
import OrderDetails from './OrderDetails';

const Checkout = () => {
    // const { cart } = useCartContext();
    const [isShipping, setIsShipping] = useState(true);
    const [isReadyToOrder, setIsReadyToOrder]=useState(false);
    console.log(isShipping);
    console.log(isReadyToOrder);

 
    if (isShipping) {
        return <ShippingAddressForm setIsShipping={setIsShipping} />;
    } else if(!isShipping && !isReadyToOrder){
        return <PaymentForm setIsReadyToOrder={setIsReadyToOrder}/>;
    }else if(isReadyToOrder){
        return <OrderDetails />
    }

};

export default Checkout;
