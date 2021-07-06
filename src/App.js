import { useState } from "react";
import { useData } from "./hooks/useData";
import styled from "styled-components";
import { Banner } from "./misc/Banner";
import { Graph } from "./graph/index.js";

const Container = styled.div`
  width: 70%;
  margin-left: 100px;
  margin-right: 25px;
  font-family: Arial;
  font-weight: bold;
  display: flex;
`;



//Height and width of SVG
const height = 400;
const width = 960;

//Margins
const margin = {
  top: 20,
  right: 75,
  bottom: 60,
  left: 75,
};

//Inner height and width
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

//length, amount,

const yAxis = "lessons";
const xAxis = "months";

export const App = () => {
  const [graphs, setGraphs] = useState([{ yAxis: "lessons", xAxis: "months", ordered: true}]);
  const data = useData();

  if (!data) {
    return <p>Loading</p>;
  }
  const handleGraphCreate = (e) => {
    if(e.target.textContent === "+") setGraphs((prev) => [...prev, { yAxis: "lessons", xAxis: "year", ordered: false}]);
    if(e.target.textContent === "-") setGraphs((prev) => {
      const newArr = [...prev]
      newArr.pop()
      return newArr
    }
    );
  };
  console.log(graphs);
  return (
    <>
      <Banner margin={margin} />
      <button onClick={(e) => handleGraphCreate(e)}>+</button>
      <button onClick={(e) => handleGraphCreate(e)}>-</button>
      <Container>
        <Graph 
          graphs={graphs}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          height={height}
          width={width}
          margin={margin}
          data={data}
        />
      </Container>
    </>
  );
};

