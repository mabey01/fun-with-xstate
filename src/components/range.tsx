import { Range as RangeType } from "../types";

interface RangeProps {
  range: RangeType;
}

export function Range({ range }: RangeProps) {
  return (
    <>
      {range.min} - {range.max}
    </>
  );
}
