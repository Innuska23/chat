import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
    return (
        <button {...props}>
            {title && <span className="button-title">{title}</span>}
            {props.children}
        </button>
    );
};