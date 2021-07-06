import styled from "styled-components"
import { Logo } from "./Logo";


const Container = styled.div`
    display: flex;
    align-items: center;
    margin-left: 25px;
    background: blac
`
const Title = styled.h1`
    font-size: 1.5em;
    margin-left: 20px;
    color: #ff4338;
`

export const Banner = ({margin}) => (
  <Container>
    <Logo margin={margin}/>
    <Title>Stats</Title>
  </Container>
);
