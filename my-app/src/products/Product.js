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
    console.log('changeOption');
    setSelectedOptions({
      ...selectedOptions,
      [attributeName]: value,
    });
    const variants = product.variants;
    const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
    if (filteredProduct) {
      setSelectedProduct(filteredProduct);
      console.log(selectedProduct, 'selectedProduct 4');
    }
  };

  useEffect(() => {
    const variants = product.variants;
    const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
    setSelectedProduct(filteredProduct);
  }, [selectedOptions]);

  return (
    <>
      <p>Product {product.name}</p>
      <p>Product Id: {product.id}</p>
      <p>Description: {product.short_description}</p>
      <span>Price {product.price}</span>
      <span>{product.currency}</span>
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

      {product.image_groups && (
        <ProductCarousel images={product.image_groups[0].images} />
      )}
    </>
  );
};

export default Product;
