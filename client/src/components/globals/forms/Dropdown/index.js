import React from 'react';
import DropdownEntry from './dropdownEntry';

const Dropdown = ({
  type,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <select
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
      >
        <DropdownEntry defaultValue value="0" placeholder="Easy" />
        <DropdownEntry value="1" placeholder="Medium" />
        <DropdownEntry value="2" placeholder="Hard" />
        <DropdownEntry value="3" placeholder="Nightmare" />
      </select>
    </div>
  );
};

export default Dropdown;
