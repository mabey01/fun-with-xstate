import { ComponentPropsWithRef } from "react";
import { Card } from "../card";

interface BoughtCardProps extends ComponentPropsWithRef<"div"> {
  onDone: () => void;
  amountOfShares: number;
}

export function BoughtCard({
  onDone,
  amountOfShares,
  className,
  ...props
}: BoughtCardProps) {
  return (
    <Card {...props} className={`bg-green-400 text-white ${className}`}>
      <div className="flex flex-col gap-1 justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="font-semibold text-xs">
          You have bought {amountOfShares} shares
        </div>
        <button
          className="mt-6 bg-white text-gray-800 font-medium text-sm rounded-lg w-36 h-10 flex justify-center items-center"
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </Card>
  );
}
