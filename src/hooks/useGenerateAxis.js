import {
  scaleLinear,
  scaleTime,
  timeFormat,
  extent,
  bin,
  timeMonths,
  timeWeeks,
  timeYears,
  sum,
  max,
  scaleBand,
} from "d3";

export const useGenerateAxis = (data, innerWidth, innerHeight, yAxis, ordered) => {
  const tickOffset = 25;
  const xAxisLabelOffset = 60;
  const yAxisLabelOffset = 50;

  const yLabel = () => {
    if (yAxis === "lessons") return "Lessons";
    if (yAxis === "hours") return "Hours";
    if (yAxis === "minutes") return "Minutes";
  };

  //X axis
  const formatTime = timeFormat("%b %y");
  const xAxisLabel = "Year";
  const xValue = (d) => d.date;
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  //Y axis
  const yValue = (d) => {
    if (yAxis === "lessons") return d.lessons;
    if (yAxis === "hours") return d.length;
    if (yAxis === "minutes") return d.length * 60;
  };

  const yAxisLabel = `${yLabel()} per month`;

  const [start, stop] = xScale.domain();
  let cumulativeCount = 0;
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => {
      const monthTotal = sum(array, yValue);
      cumulativeCount += monthTotal;
      return {
        y2: cumulativeCount,
        y: monthTotal,
        x0: array.x0,
        x1: array.x1,
      };
    });

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice();

  const yAxis2Label = `Total ${yLabel()}`;
  const yValue2 = (d) => d.y2;
  const yScale2 = scaleLinear()
    .domain([0, max(binnedData, yValue2)])
    .range([innerHeight, 0])
    .nice();

  ordered && binnedData.sort((a, b) => a.y - b.y)

  const xValue2 = (d) => d.x0;
  const xScale2 = scaleBand()
    .domain(binnedData.map(xValue2))
    .range([0, innerWidth])
    .padding(0.1);

  return {
    binnedData,
    xAxisLabel,
    xAxisLabelOffset,
    xScale,
    xScale2,
    formatTime,
    tickOffset,
    yScale,
    yScale2,
    tickOffset,
    yAxisLabelOffset,
    yAxisLabel,
    yAxis2Label,
    yAxisLabelOffset,
  };
};
