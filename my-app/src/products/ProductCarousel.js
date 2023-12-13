import Carousel from "react-bootstrap/Carousel";

const ProductCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, i) => (
        <Carousel.Item className={`carousel-item`} key={i}>
          <img
            src={image.link}
            alt={image.alt}
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-25">
            <h5>{image.title}</h5>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;