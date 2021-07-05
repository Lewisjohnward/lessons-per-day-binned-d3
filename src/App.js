import { useData } from "./useData";
import {
  scaleLinear,
  scaleTime,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  max,
} from "d3";

//Height and width of SVG
const height = 500;
const width = 960;

//Margins
const margin = {
  top: 20,
  right: 50,
  bottom: 50,
  left: 70,
};

//Inner height and width
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const tickOffset = 25;

const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50
const markOpacity = 0.6

export const App = () => {
  const data = useData();

  if (!data) {
    return <p>Loading</p>;
  }

  console.log(data);

  //X axis
  const xAxisLabel = "Year";
  const xValue = (d) => d.date;
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  console.log(xScale.ticks());
  //Y axis
  const yValue = (d) => d.length;
  const yAxisLabel = "Total Hours of Italian";

  const formatTime = timeFormat("%Y");
  const formatHours = (d) => Math.floor(d / 60);
  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));
  console.log(binnedData);

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/*x axis label*/}
        <text
          transform={`translate(${innerWidth / 2}, ${
            innerHeight + xAxisLabelOffset
          })`}
        >
          {xAxisLabel}
        </text>
        {/*x axis*/}
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} stroke="black" />
            <text style={{ textAnchor: "middle" }} y={innerHeight + tickOffset}>
              {formatTime(tickValue)}
            </text>
          </g>
        ))}

        {/*y axis*/}
        {yScale.ticks().map((tickValue) => (
          <g transform={`translate(0, ${yScale(tickValue)})`}>
            <line stroke="black" x2={innerWidth} />
            <text x={-tickOffset} dy=".2em">
              {formatHours(tickValue)}
            </text>
          </g>
        ))}
        {/*Y axis label*/}
        <text
            textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        {/*marks*/}
        {
          <g>
            {binnedData.map((d) => (
              <rect
                opacity={markOpacity}
                x={xScale(d.x0)}
                y={yScale(d.y)}
                width={xScale(d.x1) - xScale(d.x0)}
                height={innerHeight - yScale(d.y)}
              />
            ))}
          </g>
        }
      </g>
    </svg>
  );
};
