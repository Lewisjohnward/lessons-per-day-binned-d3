import styled from "styled-components"

const opacity = 0.7

export const Tick = styled.g`
  opacity: ${opacity};
  font-size: ${({height}) => height * 0.002}em;
  fill: rgb(140, 140, 140);
  stroke: rgb(140, 140, 140);
`
export const MarksStyle = styled.rect`
  fill: #ff4338;
  opacity: ${opacity};

`
export const AxisLabel = styled.text `
  font-size: ${({height}) => height * 0.004}em;
  fill: #ff4338;
  opacity:  ${opacity};
`
export const Line = styled.path`
  stroke-width: 2px;
  stroke: #00bfbd;
  fill: none;
  opacity: ${opacity};
`
