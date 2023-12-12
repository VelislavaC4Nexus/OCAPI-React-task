import ProductCarousel from './ProductCarousel';
import { useEffect, useState } from 'react';
import ProductVariantAttributes from './SelectProductVariationAttributes';
import Quantity from './SelectQuantity';
import AddToCartBtn from './AddToCartBtn';

const Product = ({ product }) => {
  const [variationAattributes, setVariationAattributes] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setVariationAattributes(product.variation_attributes);
    initializeSelectedOptions(product.variation_attributes);

  }, [product.variation_attributes]);

  const initializeSelectedOptions = (variationAttributes) => {
    const initialOptions = {};

    variationAttributes?.forEach((variationAttribute) => {
      if (variationAttribute.name === 'Color') {
        initialOptions.Color = variationAttribute.values[0]?.value;
      } else if (variationAttribute.name === 'Size') {
        initialOptions.Size = 'choose';
      }
    });
    setSelectedOptions(initialOptions);
  };

  const handleVarOptionChange = (attributeName, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [attributeName]: value,
    });
    const variants = product.variants;
    const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
    if (filteredProduct) {
      setSelectedProduct(filteredProduct);
    }
  };

  useEffect(() => {
    const variants = product.variants;
    const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
    setSelectedProduct(filteredProduct);
  }, [selectedOptions]);

  return (
    <>
      <h3 className="pb-3">Product: {product.name}</h3>
      <p className='pb-1'><span className="fw-bold">Product Id: </span><span>{product.id}</span></p>
      <p className='pb-1'><span className="fw-bold">Description: </span>{product.short_description}</p>

      <div className="row">
        <div className="col-3">

          <p className='pb-1'><span className="fw-bold">Price: </span>{product.price}<span> {product.currency}</span></p>
          {variationAattributes?.map((attribute) => (
            <ProductVariantAttributes
              variationAattribute={attribute}
              key={attribute.id}
              onVarOptionChange={(value) =>
                handleVarOptionChange(attribute.name, value)
              }
            />
          ))}
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <AddToCartBtn
            selectedProduct={selectedProduct[0]?.product_id}
            quantity={quantity}
            isOrderable={selectedProduct[0]?.orderable}
          />
        </div>
        <div className="col-6">
          {product.image_groups && (
            <ProductCarousel images={product.image_groups[0].images} />
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
