import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button
      className="p-2 outline-none border-none rounded-md w-full cursor-pointer 
      bg-green-500 text-zinc-100 font-semibold text-base max-w-sm"
      {...props}
    >
      {props.children}
    </button>
  );
}
