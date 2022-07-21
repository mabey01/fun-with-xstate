import { ComponentPropsWithRef, useState } from "react";
import { Card } from "../card";

interface BuyCardProps extends ComponentPropsWithRef<"div"> {
  onCancel: () => void;
  onBuy: (numberOfShares: number) => void;
}

export function BuyCard({ onCancel, onBuy, ...props }: BuyCardProps) {
  const [numberOfShares, setNumberOfShares] = useState(1);

  return (
    <Card {...props}>
      <h1 className="text-xs text-gray-600">Buying shares</h1>
      <div className="mt-2 flex items-center gap-2">
        <label className="flex-1">Number of Shares</label>
        <input
          className="w-16 bg-gray-100 rounded p-1"
          type="number"
          value={numberOfShares}
          onChange={(e) => setNumberOfShares(e.target.valueAsNumber)}
        />
      </div>
      <button
        onClick={() => onBuy(numberOfShares)}
        className="mt-4 bg-violet-100 text-violet-600 font-medium text-sm rounded-lg w-full h-10 flex justify-center items-center"
      >
        Buy
      </button>
      <button
        onClick={onCancel}
        className="mt-1  font-medium text-sm rounded-lg w-full h-10 flex justify-center items-center"
      >
        Cancel
      </button>
    </Card>
  );
}
