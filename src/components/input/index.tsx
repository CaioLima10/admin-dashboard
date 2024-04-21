import { forwardRef } from "react";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "password" | "text";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, placeholder, type = "text" }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="outline-none p-3 w-full max-w-md rounded-md text-base bg-zinc-950/60 
        border-none ring-1 ring-zinc-800 placeholder:text-zinc-600 text-zinc-600
        focus:ring-yellow-400
        "
      />
    );
  }
);
