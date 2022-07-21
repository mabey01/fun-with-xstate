import { ComponentProps } from "react";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={`bg-white rounded-xl p-4 ${className}`} />;
}
