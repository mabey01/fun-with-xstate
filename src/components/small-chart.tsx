import * as d3 from "d3";
import { ChartData } from "../types";

interface SmallChartProps {
  data: ChartData;
  width: number;
  height: number;
  className?: string;
}

export function SmallChart({
  className,
  width,
  height,
  data,
}: SmallChartProps) {
  const normalisedData: [number, number][] = data.map((d) => [
    new Date(d.date).getTime(),
    d.value,
  ]);

  const minDate = Math.min(...normalisedData.map((d) => d[0]));
  const maxDate = Math.max(...normalisedData.map((d) => d[0]));

  const maxValue = Math.max(...normalisedData.map((d) => d[1]));

  const xScale = d3.scaleLinear().domain([minDate, maxDate]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]);

  const line = d3
    .area()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  const result = line(normalisedData)!;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`${className} overflow-visible`}
      width={width}
      height={height}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur
            className="blur"
            result="coloredBlur"
            stdDeviation={4}
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={result}
        strokeWidth={1.5}
        fill="red"
        stroke="currentColor"
        style={{ filter: "url(#glow)" }}
      />
    </svg>
  );
}
