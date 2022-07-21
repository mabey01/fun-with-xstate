import { Spread } from "../../types";
import { Currency } from "../currency";
import { Card } from "../card";

interface BuyAndSellProps {
  spread: Spread;
}

export function BuyAndSellCard({ spread }: BuyAndSellProps) {
  return (
    <Card className="w-80">
      <div className="w-full flex gap-3">
        <div className="flex-1 flex flex-col items-center">
          <h5 className="text-gray-400 text-xs">Buying</h5>
          <Currency value={spread.buyPrice} className="mt-2 font-semibold" />
          <button className="mt-6 bg-violet-700 text-white font-medium text-sm rounded-lg w-full h-10 flex justify-center items-center">
            Buy
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h5 className="text-gray-400 text-xs">Selling</h5>
          <Currency value={spread.sellPrice} className="mt-2 font-semibold" />
          <button className="mt-6 bg-violet-100 text-violet-600 font-medium text-sm rounded-lg w-full h-10 flex justify-center items-center">
            Sell
          </button>
        </div>
      </div>
    </Card>
  );
}
