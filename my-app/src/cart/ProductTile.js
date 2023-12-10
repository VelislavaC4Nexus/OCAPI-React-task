const ProductTile = ({ item }) => {
console.log(item);
    return (
    //<div>ProductTile</div>
        <>
            <p>Product id: {item.product_id}</p>
            <p>Product name: {item.product_name}</p>
            <p>Product quantity: {item.quantity}</p>
            <p>Single price: {item.base_price}</p>
            <p>Total price after discoutn: {item.price_after_item_discount}</p>
        </>
    );

};
export default ProductTile;