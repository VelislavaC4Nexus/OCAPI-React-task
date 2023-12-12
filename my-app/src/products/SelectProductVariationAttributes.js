import { useState } from 'react';
const ProductVariantAttributes = ({
  variationAattribute,
  onVarOptionChange,
}) => {
  const [varOption, setVarOption] = useState(() => {
    if (variationAattribute.name === 'Color') {
      return variationAattribute.values[0]?.name || '';
    } else if (variationAattribute.name === 'Size') {
      return 'choose';
    } else {
      return '';
    }
  });

  const handleVarOptionChange = (value) => {
    setVarOption(value);
    onVarOptionChange(value);
  };

  return (
    <div className='pb-3'>
      <label className='fw-bold pr-2'>Select {variationAattribute.name}:  </label>
      <select className='ml-2'
        value={varOption}
        onChange={(e) => handleVarOptionChange(e.target.value)}
      >
        {variationAattribute.name === "Size" ? <option value="choose" disabled>
          choose
        </option> : null}
        {variationAattribute.values?.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductVariantAttributes;
