import ProductCarousel from "./ProductCarousel";

const SingleProductFromBundle = ({ singleProduct }) => {
    return (
        <>
            <h2>{singleProduct.product.name}</h2>
            <p>Product Id: {singleProduct.product.id}</p>
            <ProductCarousel images={singleProduct.product.image_groups[0].images} />
        </>
    );
};

export default SingleProductFromBundle;