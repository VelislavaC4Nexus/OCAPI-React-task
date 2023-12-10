import * as yup from 'yup';

const shippingFormValidationSchema = yup.object().shape({
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
  shipmentMethod: yup
    .string()
    .required("Please select Shipment Method!"),
});

export default shippingFormValidationSchema;