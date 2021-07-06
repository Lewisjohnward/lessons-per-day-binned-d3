import {Tick, AxisLabel} from "../styledComponents"

export const AxisLeft = ({yScale, height, innerWidth, tickOffset, yAxisLabel, yAxisLabelOffset, innerHeight}) => (
  <>
    {yScale.ticks().map((tickValue) => (
    <Tick height={height} key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text x={-tickOffset} dy=".2em">
        {tickValue}
      </text>
    </Tick>
  ))}
        <AxisLabel height={height}
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </AxisLabel>
  
  </>)