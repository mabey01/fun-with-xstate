import { StockPage } from "../stock-page";
import { stockFixture } from "../../fixtures/stock";

export function MarketPage() {
  const stockData = stockFixture;

  return <StockPage stock={stockData} />;
}
