const Quantity = ({ quantity, setQuantity }) => {
    const quantityValues = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div className="sort">
            <div className="sort-wrapper">
                <label className="label">Quantity</label>
                <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                    {quantityValues.map(q=><option value={q} key ={q}>{q}</option>)}
                </select>
            </div>
        </div>
    );
};

export default Quantity;