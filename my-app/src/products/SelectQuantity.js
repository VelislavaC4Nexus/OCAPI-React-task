import { useMemo } from "react";
const Quantity = ({ quantity, setQuantity }) => {
    const quantityValues = useMemo(() => {
        return Array.from({ length: 10 }, (_, index) => index + 1);
    }, []);

    return (
        <div className="mb-3">
            <label className="fw-bold pe-2">Select Quantity:</label>
            <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                {quantityValues.map(quantityValue => <option value={quantityValue} key={quantityValue}>{quantityValue}</option>)}
            </select>
        </div>
    );
};

export default Quantity;