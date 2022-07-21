interface CurrencyProps {
  className?: string;
  value: number;
  currency?: "AUD" | "USD";
}

const formatter = Intl.NumberFormat("en-AU");

export function Currency({ value, currency = "AUD", ...props }: CurrencyProps) {
  return (
    <div {...props}>
      <span className="text-gray-400">$</span>
      {formatter.format(value)}
    </div>
  );
}
