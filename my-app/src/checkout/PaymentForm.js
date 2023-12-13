import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import Loading from '../components/Loading';
import paymentFormValidationSchema from '../validations/paymentFormValidation';
import { postPaymentInstrument, putBillingAddress } from '../services/checkoutService';
import { getPaymetMethodsUrl } from '../utils/urlEndpoints';
import {
    address,
    billingAddressTitle,
    cardNumber,
    city,
    countryCode,
    expirationYer,
    exprationMonth,
    firstName,
    lastName,
    phoneNumber,
    pleaseSelectCard,
    pleaseSelectMethod,
    postalCode,
    securityCode,
    selectCardType,
    selectPaymentMethod,
    stateCode
} from '../utils/contentConstants';

const PaymentForm = ({ setIsReadyToOrder }) => {
    const { cart, setCart } = useCartContext();
    const basketId = cart?.basket_id;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token'),
        },
    };

    const { data, isLoading } = useFetch(getPaymetMethodsUrl(basketId), options);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(paymentFormValidationSchema)
    });

    const submitForm = async (data) => {
        await putBillingAddress(basketId, data);
        const responsePostPaymentInstrument = await postPaymentInstrument(basketId, data);
        setCart(responsePostPaymentInstrument);
        setIsReadyToOrder(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                    <div className="col-6">
                        <h3>{billingAddressTitle}</h3>
                        <label className="form-label" htmlFor="firstName">{firstName}</label>
                        <input
                            className="form-control"
                            id="firstName"
                            placeholder="First Name:"
                            {...register('firstName')}
                        />
                        {errors.firstName && <p className="form-text text-danger">{errors.firstName.message}</p>}

                        <label className="form-label" htmlFor="lastName">{lastName}</label>
                        <input
                            className="form-control"
                            id='lastName'
                            placeholder="Last Name:"
                            {...register('lastName')}
                        />
                        {errors.lastName && <p className="form-text text-danger">{errors.lastName.message}</p>}

                        <label className="form-label" htmlFor="address">{address}</label>
                        <input
                            className="form-control"

                            id="address"
                            placeholder="Address:"
                            {...register('address')}
                        />
                        {errors.address && <p className="form-text text-danger">{errors.address.message}</p>}

                        <label className="form-label" htmlFor="city">{city}</label>
                        <input
                            className="form-control"
                            id="city"
                            placeholder="City:"
                            {...register('city')}
                        />
                        {errors.city && <p className="form-text text-danger">{errors.city.message}</p>}

                        <label className="form-label" htmlFor="countryCode">{countryCode}</label>
                        <input
                            className="form-control"
                            id="countryCode"
                            placeholder="Country Code:"
                            {...register('countryCode')}
                        />
                        {errors.countryCode && <p className="form-text text-danger">{errors.countryCode.message}</p>}

                        <label className="form-label" htmlFor="postalCode">{postalCode}</label>
                        <input
                            className="form-control"
                            id="postalCode"
                            placeholder="Postal Code:"
                            {...register('postalCode')}
                        />
                        {errors.postalCode && <p className="form-text text-danger">{errors.postalCode.message}</p>}

                        <label className="form-label" htmlFor="stateCode">{stateCode}</label>
                        <input
                            className="form-control"
                            id="stateCode"
                            placeholder="State Code:"
                            {...register('stateCode')}
                        />
                        {errors.stateCode && <p className="form-text text-danger">{errors.stateCode.message}</p>}

                        <label className="form-label" htmlFor="phoneNumber">{phoneNumber}</label>
                        <input
                            className="form-control"
                            id='phoneNumber'
                            placeholder="Phone Number:"
                            {...register('phoneNumber')}
                        />
                        {errors.phoneNumber && <p className="form-text text-danger">{errors.phoneNumber.message}</p>}

                        <label className="form-label" htmlFor="stateCode">{stateCode}</label>
                        <input
                            className="form-control"
                            id="stateCode"
                            placeholder="State Code:"
                            {...register('stateCode')}
                        />
                        {errors.stateCode && <p className="form-text text-danger">{errors.stateCode.message}</p>}

                    </div>
                    <div className="col-6">
                        <h3>Payment Card</h3>

                        {isLoading ? <Loading /> :
                            <label className='form-label'>
                                {selectPaymentMethod}
                                <select className='form-select' {...register('paymentMethod')}>
                                    <option value=''>
                                        {pleaseSelectMethod}
                                    </option>
                                    {data.applicable_payment_methods?.map((method) => (
                                        <option value={method?.id} key={method?.name}>
                                            {method.name}
                                        </option>
                                    ))}
                                </select>
                            </label>}
                        {errors.paymentMethod && <p className="form-text text-danger">{errors.paymentMethod.message}</p>}

                        {data && data.applicable_payment_methods ?
                            <label className='form-label'>
                                {selectCardType}
                                <select className='form-select'{...register('cardType')}>
                                    <option value=''>
                                        {pleaseSelectCard}
                                    </option>
                                    {data.applicable_payment_methods[0]?.cards?.map((card) => (
                                        <option value={card?.card_type} key={card?.name}>
                                            {card.name}
                                        </option>
                                    ))}
                                </select>
                            </label> : <Loading />}
                        {errors.cardType && <p className="form-text text-danger">{errors.cardType.message}</p>}

                        <label className="form-label" htmlFor="cardNumber">{cardNumber}</label>
                        <input
                            className='form-control'
                            id="cardNumber"
                            placeholder="Card Number"
                            {...register('cardNumber')}
                        />
                        {errors.cardNumber && <p className="form-text text-danger">{errors.cardNumber.message}</p>}

                        <label className="form-label" htmlFor="securityCode">{securityCode}</label>
                        <input
                            className='form-control'
                            id="securityCode"
                            placeholder="123"
                            {...register('securityCode')}
                        />
                        {errors.securityCode && <p className="form-text text-danger">{errors.securityCode.message}</p>}

                        <label className="form-label" htmlFor="expirationMonth">{exprationMonth}</label>
                        <input
                            className='form-control'
                            id="expirationMonth"
                            placeholder="1-12"
                            {...register('expirationMonth')}
                        />
                        {errors.expirationMonth && <p className="form-text text-danger">{errors.expirationMonth.message}</p>}

                        <label className="form-label" htmlFor="expirationYear">{expirationYer}</label>
                        <input
                            className='form-control'
                            id="expirationYear"
                            placeholder="23-30"
                            {...register('expirationYear')}
                        />
                        {errors.expirationYear && <p className="form-text text-danger">{errors.expirationYear.message}</p>}

                    </div>
                    <div className="col-12 pt-3">
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Add Payment"
                        />

                    </div>
                </div>







            </form >
        </>
    );
};
export default PaymentForm;