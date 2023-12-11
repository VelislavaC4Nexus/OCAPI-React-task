import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import LoadingError from '../components/LoadingError';
import RouteError from '../components/RouteError';
import Product from './Product';
import ProductBundle from './ProductBundle';
import {  getProductUrl } from '../utils/urlEndpoints';

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useFetch(getProductUrl(productId));

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    if (error === '404') {
      return <RouteError></RouteError>;
    }
    return <LoadingError value={error} />;
  }

  if (data?.type?.bundle) {
    return <ProductBundle product={data} />;
  } else {
    return <Product product={data} />;
  }
};

export default ProductDetails;
