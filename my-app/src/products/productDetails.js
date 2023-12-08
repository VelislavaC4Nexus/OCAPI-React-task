import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import LoadingError from '../components/LoadingError';
import RouteError from '../components/RouteError';
import Product from './Product';
import useAuth from '../hooks/useAuth';

const ProductDetails = () => {
  const { id } = useParams();

  console.log("LOALSTORAGE",localStorage.getItem('token'));
  const authurl =
    'https://zydc-004.dx.commercecloud.salesforce.com/s/RefArch/dw/shop/v23_2/customers/auth';

  const url = `https://zydc-004.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v23_2/products/${id}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&expand=images,prices,variations,availability`;
  // const optionsAuth = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-dw-client-id': `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  //   },
  //   body: JSON.stringify({ type: 'guest' }),
  // }
  const { token } = useAuth(authurl);
  console.log(token, 'token');

  const { data, error, isLoading } = useFetch(url);
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    if (error === '404') {
      return <RouteError></RouteError>;
    }
    return <LoadingError value={error} />;
  }
  return (
    <div>
      <Product product={data} />

      {/* <ProductCarousel images={data.image_groups? data.image_groups[0].images: ''} /> */}
    </div>
  );
};

export default ProductDetails;
