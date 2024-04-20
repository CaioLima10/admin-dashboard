import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="outline-none p-3 w-full max-w-md rounded-md text-base bg-zinc-950/60 
      border-none ring-1 ring-zinc-800 placeholder:text-zinc-600 text-zinc-600"
    />
  );
}
