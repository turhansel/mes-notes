import React from "react";
import LoadingDots from "./icons/LoadingDots";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button {...props}>
      {loading ? <LoadingDots color="#808080" /> : children}
    </button>
  );
};

export default Button;
