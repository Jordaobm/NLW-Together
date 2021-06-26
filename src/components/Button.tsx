import { ButtonHTMLAttributes } from "react";
import "../styles/Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOutlined?: boolean;
}
export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? "outlined" : ""}`}
      {...rest}
    ></button>
  );
}
