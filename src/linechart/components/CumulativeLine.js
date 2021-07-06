import {Line} from "../styledComponents"
import {line, curveBasis} from "d3"

export const CumulativeLine = ({xScale, yScale2, binnedData, ordered}) => {
  if (ordered) return null
  return(
    <g className="mark">
            <Line
              d={line()
                .curve(curveBasis)
                .x((d) => xScale(d.x0))
                .y((d) => yScale2(d.y2))(binnedData)}
            />
          </g>
  )
}
  