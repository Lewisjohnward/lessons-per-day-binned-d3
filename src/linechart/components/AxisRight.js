import { Tick, AxisLabel } from "../styledComponents";

export const AxisRight = ({
  height,
  innerWidth,
  tickOffset,
  yScale2,
  yAxisLabelOffset,
  yAxis2Label,
  innerHeight,
  ordered,
}) => {
  if (ordered) return null;
  return (
    <>
      {yScale2.ticks().map((tickValue) => (
        <Tick
          key={tickValue}
          height={height}
          transform={`translate(${innerWidth}, ${yScale2(tickValue)})`}
        >
          <text style={{ textAnchor: "middle" }} dy=".2em" x={tickOffset}>
            {tickValue}
          </text>
        </Tick>
      ))}
      <AxisLabel
        height={height}
        style={{ textAnchor: "middle" }}
        transform={`translate(${innerWidth + yAxisLabelOffset}, ${
          innerHeight / 2
        }) rotate(90)`}
      >
        {yAxis2Label}
      </AxisLabel>
    </>
  );
};
