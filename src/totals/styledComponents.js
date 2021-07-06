import styled from "styled-components"

export const Container = styled.div`
  margin-left: 20px;
  margin-top: 5px;
`;

export const TextContainer = styled.div`
    margin-bottom: 20px;
`

export const Title = styled.p`
  font-size: ${({ height }) => height * 0.004}em;
  color: #ff4338;
  opacity: 0.8;
  margin: 0;
`;
export const Text = styled.p`
  font-size: ${({ height }) => height * 0.004}em;
  color: rgb(140, 140, 140);
  opacity: 0.8;
  margin: 0;
`;