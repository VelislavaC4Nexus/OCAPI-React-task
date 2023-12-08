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
  //const [isSelected, setIsSelected]=useState(false)

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
      // Add more conditions for other possible attributes if needed
    });
    setSelectedOptions(initialOptions);
  };

  // const filterSelectedProduct = () => {

  //   const variants = product.variants;
  //   if (selectedOptions.Size || selectedOptions.Size !== 'choose') {
  //     const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
  //     return filteredProduct;
  //   }
  //   console.log('variants', variants);
  //   return "no product";
  // };
  // let filteredProduct;
  // useEffect(() => {
  // filteredProduct = filterSelectedProduct();
  //   setSelectedProduct(filteredProduct); // Set the filtered product in state
  // }, [selectedOptions]);
  // console.log('filteredProduct', filteredProduct);


  console.log(selectedOptions, 'selectedOptions 1');
  const isSelected =
    selectedOptions.Color && selectedOptions.Size ? true : false;

  // const productSelected = variants?.find(
  //   (v) =>
  //     v.variation_values.color === selectedOptions.Color &&
  //     v.variation_values.size === selectedOptions.Size
  // );
  // console.log(productSelected, 'productSelected');

  const handleVarOptionChange = (attributeName, value) => {
    console.log('changeOption');
    setSelectedOptions({
      ...selectedOptions,
      [attributeName]: value,
    });
    const variants = product.variants;
    console.log(selectedOptions, 'ffffffff 2');
    
      const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
      console.log(filteredProduct,'aaaaaaaaaaa 3');
      if (filteredProduct) {
console.log('filter');
        setSelectedProduct(filteredProduct);
        console.log(selectedProduct,'selectedProduct 4');
      }
    

  };

  useEffect(() => {
    const variants = product.variants;
    const filteredProduct = variants?.filter(v => v.variation_values.color === selectedOptions.Color && v.variation_values.size === selectedOptions.Size);
    // filteredProduct = filterSelectedProduct();
      setSelectedProduct(filteredProduct); // Set the filtered product in state
    }, [selectedOptions]);

  console.log(selectedProduct,'selectedProduct 4');
  console.log(selectedProduct[0]?.product_id,'selectedProduct[0]');
  //console.log('selectedProduct', selectedProduct);
  // if(filteredProduct){

  //   console.log(filteredProduct&&filteredProduct[0].orderable, "orderable");
  //   console.log(filteredProduct&&filteredProduct[0].product_id, "id");
  // }

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
      {/* <AddToCartBtn
        selectedProduct={selectedProduct? selectedProduct[0].product_id: null}
        quantity={quantity}
        isOrderable={selectedProduct? selectedProduct[0].orderable: null}
      /> */}

      {product.image_groups && (
        <ProductCarousel images={product.image_groups[0].images} />
      )}
    </>
  );
};

export default Product;
