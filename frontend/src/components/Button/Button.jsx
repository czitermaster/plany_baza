import React from "react";
import "./button.css";

const Button = ({
  disabled = false,
  variant = "primary",
  children,
  onClick,
}) => {
  const variantMapping = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    delete: "btn-delete",
  };

  const variantClass = variantMapping[variant];
  if (!variantClass) {
    throw new Error("Variant not supported");
  }
  const className = `btn ${variantClass}`;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
