import { useState } from 'react';
import ShippingAddressForm from './ShippingAddressForm';
import PaymentForm from './PaymentForm';
import OrderDetails from './OrderDetails';

const Checkout = () => {
    const [isShipping, setIsShipping] = useState(true);
    const [isReadyToOrder, setIsReadyToOrder] = useState(false);

    if (isShipping) {
        return <ShippingAddressForm setIsShipping={setIsShipping} />;
    } else if (!isShipping && !isReadyToOrder) {
        return <PaymentForm setIsReadyToOrder={setIsReadyToOrder} />;
    } else if (isReadyToOrder) {
        return <OrderDetails />;
    }
};

export default Checkout;
