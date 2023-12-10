import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import Loading from '../components/Loading';
import paymentFormValidationSchema from '../validations/paymentFormValidation';
import { putBillingAddress } from '../services/checkoutService';


const PaymentForm = () => {
    const { cart } = useCartContext();
    const basketId = cart?.basket_id;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };

    const urlPaymentMetods = `https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/baskets/${basketId}/payment_methods`;
    const { data, isLoading } = useFetch(urlPaymentMetods, options);
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(paymentFormValidationSchema)
    });

    const submitForm = async (data) => {
        console.log(data);
        await putBillingAddress(basketId,data)
        // await putShippingMethod(basketId, shipmentId, data.shipmentMethod);
        // setIsShipping(false);
    };

    return (
        <>
            <div>Billing address:</div>

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

                    <label className="create__label" htmlFor="stateCode">State Code:</label>
                    <span className="input">
                        <input
                            id="stateCode"
                            placeholder="State Code:"
                            {...register('stateCode')}
                        />
                    </span>
                    {errors.stateCode && <p className="login__errors">{errors.stateCode.message}</p>}

                    {/* payment */}


                    {isLoading ? <Loading /> :
                        <label>
                            Select Payment Method
                            <select {...register('paymentMethod')}>
                                <option value=''>
                                    please select method
                                </option>
                                {data.applicable_payment_methods?.map((method) => (
                                    <option value={method?.name} key={method?.name}>
                                        {method.name}
                                    </option>
                                ))}
                            </select>
                        </label>}
                    {errors.paymentMethod && <p className="login__errors">{errors.paymentMethod.message}</p>}

                    {data && data.applicable_payment_methods ? 
                        <label>
                            Select Card Type
                            <select {...register('cardType')}>
                                <option value=''>
                                    please select method
                                </option>
                                {data.applicable_payment_methods[0]?.cards?.map((card) => (
                                    <option value={card?.card_type} key={card?.name}>
                                        {card.name}
                                    </option>
                                ))}
                            </select>
                        </label>: <Loading></Loading>}
                    {errors.cardType && <p className="login__errors">{errors.cardType.message}</p>}

                    <label className="create__label" htmlFor="cardNumber">Card Number:</label>
                    <span className="input">
                        <input
                            id="cardNumber"
                            placeholder="4444333322221111"
                            {...register('cardNumber')}
                        />
                    </span>
                    {errors.cardNumber && <p className="login__errors">{errors.cardNumber.message}</p>}


                    <label className="create__label" htmlFor="securityCode">Security Code:</label>
                    <span className="input">
                        <input
                            id="securityCode"
                            placeholder="123"
                            {...register('securityCode')}
                        />
                    </span>
                    {errors.securityCode && <p className="login__errors">{errors.securityCode.message}</p>}

                    <label className="create__label" htmlFor="expirationMonth">Expiration Month</label>
                    <span className="input">
                        <input
                            id="expirationMonth"
                            placeholder="1-12"
                            {...register('expirationMonth')}
                        />
                    </span>
                    {errors.expirationMonth && <p className="login__errors">{errors.expirationMonth.message}</p>}

                    
                    <label className="create__label" htmlFor="expirationYear">Expiration Year</label>
                    <span className="input">
                        <input
                            id="expirationYear"
                            placeholder="23-30"
                            {...register('expirationYear')}
                        />
                    </span>
                    {errors.expirationYear && <p className="login__errors">{errors.expirationYear.message}</p>}
                    
                    <div className="">
                        <input
                            className="button submit"
                            type="submit"
                            defaultValue="Add Billing Address"
                        />
                    </div>
                </form >
            </div>

        </>
    );
};
export default PaymentForm;