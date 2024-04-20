import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: LabelProps) {
  return (
    <label
      className="w-full max-w-md text-base text-zinc-400 my-2 flex"
      {...props}
    />
  );
}
