import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="outline-none p-2 w-full max-w-sm rounded-md text-base bg-zinc-200 border-none"
    />
  );
}
