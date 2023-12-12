import { useState } from "react";
import SingleProductFromBundle from "./SingleProductFromBundle";
import Quantity from "./SelectQuantity";
import AddToCartBtn from "./AddToCartBtn";

const ProductBundle = ({ product }) => {
    console.log(product);
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <div className="border-bottom pb-4">
                <h3 className="text-center">{product.name}</h3>
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                <AddToCartBtn
                    selectedProduct={product.id}
                    quantity={quantity}
                    isOrderable={product?.inventory?.orderable}
                />
            </div>
            {product?.bundled_products?.map((singleProduct) => <SingleProductFromBundle singleProduct={singleProduct} key={singleProduct.product.id} />)}
        </>
    );

};

export default ProductBundle;