import { useState } from "react";
import SingleProductFromBundle from "./SingleProductFromBundle";
import Quantity from "./SelectQuantity";
import AddToCartBtn from "./AddToCartBtn";

const ProductBundle = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    product?.bundled_products?.map(p => console.log(p.product.name));
    return (
        <>
            {product?.bundled_products?.map((singleProduct) => <SingleProductFromBundle singleProduct={singleProduct} key={singleProduct.product.id} />)}
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <AddToCartBtn
                selectedProduct={product.id}
                quantity={quantity}
                isOrderable={product?.inventory?.orderable}
            />
        </>);

};

export default ProductBundle;