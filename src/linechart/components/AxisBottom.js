import {Tick, AxisLabel} from "../styledComponents"
import {timeFormat} from "d3"

export const AxisBottom = ({xScale, innerHeight, height, formatTime, tickOffset, innerWidth, xAxisLabelOffset, xAxisLabel, ordered}) => {
  if (ordered) return (
    xScale.domain().map((tickValue) => (
    <Tick 
      key={tickValue}
      height={height}  
      transform={`translate(${xScale(tickValue)}, 0)`}
      >
      <text 
        style={{ textAnchor: "middle" }} 
        transform={`translate(0, ${innerHeight + tickOffset}) rotate(90)`}
      >
        {formatTime(tickValue)}
      </text>
    </Tick>
  )))
  
  return (
  <>
    
    {xScale.ticks().map((tickValue) => {
      console.log(xScale(tickValue))
      console.log(xScale.domain())
      return (<Tick 
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
        >
        <line y2={innerHeight} />
        <text 
          style={{ textAnchor: "middle" }} 
          y={innerHeight + tickOffset}
        >
          {timeFormat("%Y")(tickValue)}
        </text>
      </Tick>
    )})}
    <AxisLabel height={height}
        style={{ textAnchor: "middle" }}
          transform={`translate(${innerWidth / 2}, ${
            innerHeight + xAxisLabelOffset
          })`}
        >
          {xAxisLabel}
        </AxisLabel>
    </>
  )}