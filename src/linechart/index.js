import { AxisBottom } from "./components/AxisBottom";
import { AxisLeft } from "./components/AxisLeft";
import { AxisRight } from "./components/AxisRight";
import { Marks } from "./components/Marks";
import { CumulativeLine } from "./components/CumulativeLine";
import {useGenerateAxis} from "../hooks/useGenerateAxis"



export const LineChart = ({
  height,
  width,
  margin,
  data,
  innerWidth,
  innerHeight,
  yAxis,
  ordered
}) => {
  const {
    binnedData,
    xAxisLabel,
    xAxisLabelOffset,
    xScale,
    xScale2,
    yScale,
    yScale2,
    formatTime,
    tickOffset,
    yAxisLabelOffset,
    yAxisLabel,
    yAxis2Label} = useGenerateAxis(data, innerWidth, innerHeight, yAxis, ordered)
    
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          height={height}
          ordered={ordered}
          xAxisLabel={xAxisLabel}
          xAxisLabelOffset={xAxisLabelOffset}
          xScale={ordered ? xScale2: xScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          formatTime={formatTime}
          tickOffset={tickOffset}
        />

        <AxisLeft
          height={height}
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={tickOffset}
          yAxisLabelOffset={yAxisLabelOffset}
          yAxisLabel={yAxisLabel}
          innerHeight={innerHeight}
        />

        <AxisRight
          height={height}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          tickOffset={tickOffset}
          yScale2={yScale2}
          yAxis2Label={yAxis2Label}
          yAxisLabelOffset={yAxisLabelOffset}
          ordered={ordered}
        />

        <Marks
          binnedData={binnedData}
          innerHeight={innerHeight}
          xScale={ordered ? xScale2 : xScale}
          ordered={ordered}
          yScale={yScale}
        />

        <CumulativeLine
          xScale={xScale}
          yScale2={yScale2}
          binnedData={binnedData}
          ordered={ordered}
        />
      </g>
    </svg>
  );
};
