import React from 'react';

const DropdownEntry = ({
  value,
  placeholder,
  selected,
}) => {
  return (
    <option selected={selected} value={value}>{placeholder}</option>
  );
};

export default DropdownEntry;
