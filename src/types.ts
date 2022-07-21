export type Account = {
  avatar: string;
  name: string;
  email: string;
};

export type ChartData = Array<{ date: number; value: number }>;

export type Range = {
  min: number;
  max: number;
};

export type StockValue = {
  value: number;
  trendAbsolute: number;
  trendPercentage: number;
};

export type Spread = {
  buyPrice: number;
  sellPrice: number;
};

export type Stock = {
  id: string;
  name: string;
  symbol: string;
  current: StockValue;
  preMarket: StockValue;
  previousClose: {
    value: number;
    date: string;
  };
  open: {
    value: number;
    date: string;
  };
  details: {
    dayRange: Range;
    fiftyTwoWeekRange: Range;
    volume: number;
    averageVolume: number;
  };
  spread: Spread;
  trendChartData: ChartData;
  chartData: ChartData;
};
