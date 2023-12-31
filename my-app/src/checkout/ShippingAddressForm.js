import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import shippingFormValidationSchema from '../validations/shippingFormValidationSchema';
import Loading from '../components/Loading';
import { putShippingMethod, addShippingAddress } from '../services/checkoutService';
import { useCartContext } from '../contexts/CartContext';
import useFetch from '../hooks/useFetch';
import { getShippingMethodsUrl } from '../utils/urlEndpoints';
import {
    address,
    city,
    countryCode,
    firstName,
    lastName,
    phoneNumber,
    pleaseSelectMethod,
    postalCode,
    selectShipmentMethod,
    shippingAddressTitle,
    stateCode
} from '../utils/contentConstants';

const ShippingAddressForm = ({ setIsShipping, isShipping }) => {
    const { cart, setCart } = useCartContext();
    const shipmentId = cart?.shipments[0].shipment_id;
    const basketId = cart?.basket_id;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };
    const { data, isLoading } = useFetch(getShippingMethodsUrl(basketId, shipmentId), options);


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(shippingFormValidationSchema)
    });

    const submitForm = async (data) => {
        setIsShipping(false);
        await addShippingAddress(basketId, shipmentId, data);
        const responseAddPutShippingMethod = await putShippingMethod(basketId, shipmentId, data.shipmentMethod);
        setCart(responseAddPutShippingMethod);

    };
    return (<>
        <h3>{shippingAddressTitle}</h3>

        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                    <div className="col-6">

                        <div className='p-2'>
                            <label className="form-label" htmlFor="firstName">{firstName}</label>
                            <input
                                className='form-control'
                                id="firstName"
                                placeholder="First Name:"
                                {...register('firstName')}
                            />
                            {errors.firstName && <p className="form-text text-danger">{errors.firstName.message}</p>}
                        </div>

                        <div className='p-2'>
                            <label className="form-label" htmlFor="lastName">{lastName}</label>
                            <input
                                className='form-control'
                                id='lastName'
                                placeholder="Last Name:"
                                {...register('lastName')}
                            />
                            {errors.lastName && <p className="form-text text-danger">{errors.lastName.message}</p>}
                        </div>

                        <div className='p-2'>
                            <label className="form-label" htmlFor="address">{address}</label>
                            <input
                                className='form-control'
                                id="address"
                                placeholder="Address:"
                                {...register('address')}
                            />
                            {errors.address && <p className="form-text text-danger">{errors.address.message}</p>}
                        </div>
                        <div className='p-2'>
                            <label className="form-label" htmlFor="city">{city}</label>
                            <input
                                className='form-control'
                                id="city"
                                placeholder="City:"
                                {...register('city')}
                            />
                            {errors.city && <p className="form-text  text-danger">{errors.city.message}</p>}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='p-2'>
                            <label className="form-label" htmlFor="countryCode">{countryCode}</label>
                            <input
                                className='form-control'
                                id="countryCode"
                                placeholder="Country Code:"
                                {...register('countryCode')}
                            />
                            {errors.countryCode && <p className="form-text  text-danger">{errors.countryCode.message}</p>}
                        </div>

                        <div className='p-2'>
                            <label className="form-label" htmlFor="postalCode">{postalCode}</label>
                            <input
                                className='form-control'
                                id="postalCode"
                                placeholder="Postal Code:"
                                {...register('postalCode')}
                            />
                            {errors.postalCode && <p className="form-text  text-danger">{errors.postalCode.message}</p>}
                        </div>

                        <div className='p-2'>
                            <label className="form-label" htmlFor="stateCode">{stateCode}</label>
                            <input
                                className='form-control'
                                id="stateCode"
                                placeholder="State Code:"
                                {...register('stateCode')}
                            />
                            {errors.stateCode && <p className="form-text text-danger">{errors.stateCode.message}</p>}
                        </div>

                        <div className='p-2'>
                            <label className="form-label" htmlFor="phoneNumber">{phoneNumber}</label>
                            <input
                                className='form-control'
                                id='phoneNumber'
                                placeholder="Phone Number:"
                                {...register('phoneNumber')}
                            />
                            {errors.phoneNumber && <p className="form-text  text-danger">{errors.phoneNumber.message}</p>}
                        </div>

                    </div>
                    <div className="col-12">

                        <div className='p-2 mb-4'>
                            {isLoading ? <Loading /> :
                                <label className='form-label'>
                                    {selectShipmentMethod}
                                    <select className='form-select' {...register('shipmentMethod')}>
                                        <option value=''>
                                            {pleaseSelectMethod}
                                        </option>
                                        {data.applicable_shipping_methods?.map((method) => (
                                            <option value={method?.id} key={method?.name}>
                                                {method.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>}
                            {errors.shipmentMethod && <p className="form-text  text-danger">{errors.shipmentMethod.message}</p>}
                        </div>
                    </div>

                </div>


                <div >
                    <input
                        className="btn btn-primary"
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
