import React from "react";

interface SelectProps {
  selectedValue: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { _id: string; name: string }[];
}

const SelectInput: React.FC<SelectProps> = ({
  selectedValue,
  label,
  onChange,
  options,
}) => {
  const labelClass = "block text-sm font-medium text-gray-500";

  return (
    <div className="space-y-2">
      {label && <label className={labelClass}>{label}</label>}
      <select
        value={selectedValue}
        className="block w-full py-2 px-3 border border-black text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={onChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option
            className="capitalize text-base"
            key={option._id}
            value={option.name}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
