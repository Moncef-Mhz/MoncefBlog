import React from "react";

interface Props {
  className?: string;
  placeholder: string;
  label?: string;
  type: string;
  varient: "default" | "ghost";
  min?: number;
  max?: number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input = (props: Props) => {
  const {
    className,
    placeholder,
    label,
    type,
    varient,
    max,
    min,
    required,
    onChange,
    value,
  } = props;

  const labelClass = "block text-sm   font-medium text-gray-500";

  if (varient === "default") {
    return (
      <div className="space-y-2">
        {label && (
          <label className={labelClass}>
            {" "}
            {label}
            {/* {required ? <p className="text-red-500">*</p> : ""} */}
          </label>
        )}
        <input
          className={[
            className,
            "px-4 py-2 w-full rounded-md outline-none caret-black text-black border",
          ]
            .filter(Boolean)
            .join("")}
          placeholder={placeholder}
          minLength={min}
          onChange={onChange}
          value={value}
          maxLength={max}
          type={type}
        />
      </div>
    );
  }
  if (varient === "ghost") {
    return (
      <>
        <input
          className={[
            className,
            "px-4 py-2 rounded-md w-full outline-none bg-transparent text-white caret-white ",
          ]
            .filter(Boolean)
            .join("")}
          placeholder={placeholder}
          minLength={min}
          onChange={onChange}
          value={value}
          maxLength={max}
          type={type}
        />
      </>
    );
  }
};

export default Input;
