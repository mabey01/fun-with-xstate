import * as d3 from "d3";
import { useMeasure } from "react-use";
import { ChartData } from "../types";

interface BigChartProps {
  data: ChartData;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "numeric",
});

export function BigChart({ className, data }: BigChartProps) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();
  const normalisedData: [number, number][] = data.map((d) => [
    new Date(d.date).getTime(),
    d.value,
  ]);

  const minDate = Math.min(...normalisedData.map((d) => d[0]));
  const maxDate = Math.max(...normalisedData.map((d) => d[0]));

  const minValue = Math.min(...normalisedData.map((d) => d[1]));
  const maxValue = Math.max(...normalisedData.map((d) => d[1]));

  const xScale = d3
    .scaleLinear()
    .domain([minDate, maxDate])
    .range([30, width - 10]);

  const yScale = d3
    .scaleLinear()
    .domain([minValue - 0.1 * minValue, maxValue + 0.1 * maxValue])
    .range([height, 0]);

  const line = d3
    .area()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  const result = line(normalisedData)!;

  return (
    <div ref={ref} className={`${className} w-full h-full overflow-visible`}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {yScale.ticks(6).map((tick) => (
          <g
            key={tick}
            transform={`translate(0, ${yScale(tick)})`}
            className="text-gray-300"
          >
            <line
              x1={30}
              x2={width}
              stroke="currentColor"
              strokeWidth={0.5}
              opacity={0.5}
            />

            <text
              className="text-sm text-gray-400"
              fill="currentColor"
              alignmentBaseline="middle"
            >
              {tick}
            </text>
          </g>
        ))}

        {xScale.ticks(8).map((tick) => (
          <g
            key={tick}
            transform={`translate(${xScale(tick)}, 0)`}
            className="text-gray-300"
          >
            <line
              y1={30}
              y2={height - 20}
              stroke="currentColor"
              strokeWidth={0.5}
              opacity={0.5}
            />

            <text
              y={height}
              className="text-sm text-gray-400"
              fill="currentColor"
              textAnchor="middle"
            >
              {dateFormatter.format(new Date(tick))}
            </text>
          </g>
        ))}

        <path
          d={result}
          strokeWidth={1.5}
          fill="red"
          stroke="currentColor"
          className="text-violet-800"
        />
      </svg>
    </div>
  );
}
