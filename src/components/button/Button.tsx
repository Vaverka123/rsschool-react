import type { FC, ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className="h-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded shadow-md transition cursor-pointer"
    {...props}
  >
    {children}
  </button>
);

export default Button;
