import { sum,scaleTime, extent,bin, timeMonths } from "d3";
import {Container, TextContainer, Title, Text} from "./styledComponents"

export const Totals = ({ height, data }) => {
  const total = sum(data, (d) => d.length);
  const firstLesson = data[data.length-1].date.getTime()
  const today = new Date()
  const difference = Math.round((today - firstLesson) / (1000*60*60*24))

  const xValue = d => d.date
  const xScale = scaleTime()
  .domain(extent(data, xValue))
  const [start, stop] = xScale.domain();
  let cumulativeCount = 0;
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => {
      const monthTotal = sum(array, d => d.lessons);
      const timeTotal = sum(array, d => d.length)
      cumulativeCount += monthTotal;
      return {
        y2: cumulativeCount,
        y1: timeTotal,
        y: monthTotal,
        x0: array.x0,
        x1: array.x1,
      };
    });

    const monthsWithoutLesson = binnedData.filter(d => d.y === 0).length
    const monthWithMostLessons = () => {
      let mostLessons = 0
      binnedData.filter(d => {
        if (d.y > mostLessons){
          mostLessons = d.y
        }})
      return mostLessons
      }

      const monthWithMostTime = () => {
        let mostTime = 0
        binnedData.map(d => {
          if (d.y1 > mostTime){
            mostTime = d.y1
          }})
        return mostTime
        }


  return (
    <Container>
      <TextContainer>
        <Title height={height}>TOTAL LESSONS</Title>
        <Text height={height}>{data.length}</Text>
      </TextContainer>
      <TextContainer>
        <Title height={height}>TOTAL TIME</Title>
        <Text height={height}>{total} hrs</Text>
      </TextContainer>
      <TextContainer>
        <Title height={height}>DAYS SINCE FIRST LESSON</Title>
        <Text height={height}>{difference} days</Text>
        </TextContainer>
        <TextContainer>
        <Title height={height}>LONGEST TIME WITHOUT LESSON</Title>
        <Text height={height}> ? hrs</Text>
        </TextContainer>
        <TextContainer>
        <Title height={height}>MONTHS WITHOUT LESSON</Title>
        <Text height={height}>{monthsWithoutLesson} months</Text>
        </TextContainer>
        <TextContainer>
        <Title height={height}>MONTH WITH MOST LESSONS</Title>
        <Text height={height}>{monthWithMostLessons()} </Text>
        </TextContainer>
        <TextContainer>
        <Title height={height}>MONTH WITH MOST TIME</Title>
        <Text height={height}>{monthWithMostTime()}</Text>
        </TextContainer>
        <TextContainer>
        <Title height={height}>DAY WITH MOST LESSONS</Title>
        <Text height={height}>{total} hrs</Text>
        </TextContainer>
        <TextContainer>
        <Title height={height}>DAY WITH MOST TIME</Title>
        <Text height={height}>{total} hrs</Text>
        </TextContainer>
        
    </Container>
  );
};
