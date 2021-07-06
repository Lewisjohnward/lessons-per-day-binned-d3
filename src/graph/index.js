import {LineChart} from "../linechart/index"
import {Totals} from "../totals/index.js"
import {LineChartContainer} from "./styledComponents"
import {useGenerateAxis} from "../hooks/useGenerateAxis"
export const Graph = ({ graphs, innerWidth, innerHeight, height, width, margin, data}) => (


  <>
    <LineChartContainer>
      {graphs.map(({ xAxis, yAxis, ordered }) => (
        <LineChart
          xAxis={xAxis}
          yAxis={yAxis}
          ordered={ordered}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          height={height}
          width={width}
          margin={margin}
          data={data}
        />
      ))}
    </LineChartContainer>
    <Totals height={height} data={data} />
  </>
);

