import { ComponentPropsWithRef } from "react";
import { Card } from "../card";

export function BuyingCard({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <Card {...props} className={`bg-violet-400 text-white ${className}`}>
      <div className="flex flex-col gap-1 justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="font-semibold text-xs">Buying ...</div>
      </div>
    </Card>
  );
}
