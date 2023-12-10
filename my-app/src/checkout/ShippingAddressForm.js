import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import shippingFormValidationSchema from '../validations/shippingFormValidationSchema';
import Loading from '../components/Loading';
import { putShippingMethod,addShippingAddress } from '../services/checkoutService';
import { useCartContext } from '../contexts/CartContext';
import useFetch from '../hooks/useFetch';

const ShippingAddressForm = ({setIsShipping,isShipping}) => {
    const { cart } = useCartContext();
    const shipmentId = cart?.shipments[0].shipment_id;
    const basketId = cart?.basket_id;

    const urlGetShipmentMethod = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/shipments/${shipmentId}/shipping_methods`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };
    const { data, isLoading } = useFetch(urlGetShipmentMethod, options);


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(shippingFormValidationSchema)
    });

    const submitForm = async (data) => {
        console.log('SUBMIT');
        setIsShipping(false);
        console.log(isShipping);
       const sth = await addShippingAddress(basketId, shipmentId, data);
       const asd= await putShippingMethod(basketId, shipmentId, data.shipmentMethod);
        console.log(isShipping,'isShipping');

    };
    return (<>
        <div>Shipping address:</div>

        <div>
            <form onSubmit={handleSubmit(submitForm)}>

                <label className="create__label" htmlFor="firstName">First Name:</label>
                <span className="input">
                    <input
                        id="firstName"
                        placeholder="First Name:"
                        {...register('firstName')}
                    />
                </span>

                {errors.firstName && <p className="login__errors">{errors.firstName.message}</p>}

                <label className="create__label" htmlFor="lastName">Last Name:</label>
                <span className="input">
                    <input
                        id='lastName'
                        placeholder="Last Name:"
                        {...register('lastName')}
                    />
                </span>
                {errors.lastName && <p className="login__errors">{errors.lastName.message}</p>}

                <label className="create__label" htmlFor="address">Address:</label>
                <span className="input">
                    <input
                        id="address"
                        placeholder="Address:"
                        {...register('address')}
                    />
                </span>
                {errors.address && <p className="login__errors">{errors.address.message}</p>}


                <label className="create__label" htmlFor="city">City:</label>
                <span className="input">
                    <input
                        id="city"
                        placeholder="City:"
                        {...register('city')}
                    />
                </span>
                {errors.city && <p className="login__errors">{errors.city.message}</p>}

                <label className="create__label" htmlFor="countryCode">Country Code:</label>
                <span className="input">
                    <input
                        id="countryCode"
                        placeholder="Country Code:"
                        {...register('countryCode')}
                    />
                </span>
                {errors.countryCode && <p className="login__errors">{errors.countryCode.message}</p>}

                <label className="create__label" htmlFor="postalCode">Postal Code:</label>
                <span className="input">
                    <input
                        id="postalCode"
                        placeholder="Postal Code:"
                        {...register('postalCode')}
                    />
                </span>
                {errors.postalCode && <p className="login__errors">{errors.postalCode.message}</p>}

                <label className="create__label" htmlFor="stateCode">State Code:</label>
                <span className="input">
                    <input
                        id="stateCode"
                        placeholder="State Code:"
                        {...register('stateCode')}
                    />
                </span>
                {errors.stateCode && <p className="login__errors">{errors.stateCode.message}</p>}

                <label className="create__label" htmlFor="phoneNumber">Phone Number:</label>
                <span className="input">
                    <input
                        id='phoneNumber'
                        placeholder="Phone Number:"
                        {...register('phoneNumber')}
                    />
                </span>
                {errors.phoneNumber && <p className="login__errors">{errors.phoneNumber.message}</p>}

                {isLoading ? <Loading /> :
                    <label>
                        Select Shipment Method
                        <select {...register('shipmentMethod')}>
                            <option value=''>
                                please select method
                            </option>
                            {data.applicable_shipping_methods?.map((method) => (
                                <option value={method?.id} key={method?.name}>
                                    {method.name}
                                </option>
                            ))}
                        </select>
                    </label>}
                {errors.shipmentMethod && <p className="login__errors">{errors.shipmentMethod.message}</p>}

                <div className="">
                    <input
                        className="button submit"
                        type="submit"
                        value="Add Shipping Address"
                    />
                </div>
            </form >
        </div>
    </>
    );
};

export default ShippingAddressForm;
