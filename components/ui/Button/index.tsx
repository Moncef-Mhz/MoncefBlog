import React from "react";

type ButtonType = {
  variant: "default" | "ghost" | "outline";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled?: boolean;
  //   label: string;
  rounded: "full" | "lg" | "xl" | "md" | "sm";
};

const Button: React.FC<ButtonType> = ({
  variant,
  className,
  children,
  rounded,
  onClick,
  disabled,
}) => {
  if (variant === "default") {
    return (
      <button
        className={`px-4 py-2 space-x-2 rounded-full bg-white text-black  `}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (variant === "ghost") {
    return (
      <button
        className={`px-4 py-2 rounded-${rounded} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (variant === "outline") {
    return (
      <button
        className={`px-4 py-2 rounded-${rounded} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
