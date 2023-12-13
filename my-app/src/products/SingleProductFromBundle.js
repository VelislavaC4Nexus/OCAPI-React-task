import { productIdConstant } from "../utils/contentConstants";
import ProductCarousel from "./ProductCarousel";

const SingleProductFromBundle = ({ singleProduct }) => {
    return (
        <div className="row border-bottom pt-3">
            <div className="col-3">
                <h4>{singleProduct.product.name}</h4>
                <p><span className="fw-bold">{productIdConstant} </span>{singleProduct.product.id}</p>
            </div>
            <div className="col-6">
                <ProductCarousel images={singleProduct.product.image_groups[0].images} />
            </div>
        </div>
    );
};

export default SingleProductFromBundle;