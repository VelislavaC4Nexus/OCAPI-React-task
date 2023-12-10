import * as yup from 'yup';

const paymentFormValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Please enter First Name!"),
    lastName: yup
        .string()
        .required("Please enter Last Name!"),
    address: yup
        .string()
        .required("Please enter Address!"),
    city: yup
        .string()
        .required("Please enter City!"),
    postalCode: yup
        .string()
        .required("Please enter Postal Code!"),
    stateCode: yup
        .string()
        .required("Please enter State Code!"),
    countryCode: yup
        .string()
        .required("Please enter Country Code!"),
    phoneNumber: yup
        .string()
        .matches(/^\+?[0-9]+$/, 'Phone number is not valid')
        .min(9, 'Phone number should be at least 9 digits!')
        .max(20, 'Phone number should not exceed 20 digits!')
        .required("Please enter Phone Number!"),
    paymentMethod: yup
        .string()
        .required("Please select Payment Method!"),
    cardType: yup
        .string()
        .required("Please select Card Type!"),
    cardNumber: yup
        .string()
        .matches(/^[0-9]{13,16}$/, 'Card number is not valid')
        .required("Please select Card Number!"),
    securityCode: yup
        .string()
        .matches(/^[0-9]{3,3}$/, 'Security Code is not valid')
        .required("Please select Security Code!"),
    expirationMonth: yup
        .number()
        .integer('Expiration month must be a whole number')
        .min(1, 'Expiration month should be between 1 and 12')
        .max(12, 'Expiration month should be between 1 and 12')
        .required("Please enter Expiration Month!"),
    expirationYear: yup
        .number()
        .integer('Expiration year must be a whole number')
        .min(23, 'Expiration year should be between 23 and 30')
        .max(30, 'Expiration year should be between 23 and 30')
        .required("Please enter Expiration Year!"),
});

export default paymentFormValidationSchema;