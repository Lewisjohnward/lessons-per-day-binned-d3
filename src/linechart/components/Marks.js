import { MarksStyle } from "../styledComponents";

export const Marks = ({
  binnedData,
  innerHeight,
  xScale,
  yScale,
  ordered
}) => (
  <g>
    {binnedData.map((d, i) => (
      <>
        <MarksStyle
          key={i}
          style={{ fill: "url(#linear-gradient)" }}
          id={"gradient"}
          x={xScale(d.x0)}
          y={yScale(d.y)}
          width={ordered ? xScale.bandwidth() : xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - yScale(d.y)}
        />
        <linearGradient
          id="linear-gradient"
          gradientUnits="userSpaceOnUse"
          x1="1041.6901"
          y1="0"
          x2="1041.6901"
          y2="169.485"
          gradientTransform="matrix(1 0 0 -1 -761.14 398.97)"
        >
          <stop offset="14%" stopColor="#ff4338" stopOpacity="0%" />
          <stop offset="23%" stopColor="#ff4338" stopOpacity="70%" />
          <stop offset="67%" stopColor="#ff4338" stopOpacity="73%" />
          <stop offset="79%" stopColor="#ff4338" stopOpacity="80%" />
        </linearGradient>
      </>
    ))}
  </g>
);
