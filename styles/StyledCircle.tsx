import React from "react";
import styled from "styled-components";

interface StyledCircleProps {
  size?: string;
  background?: string;
}

const StyledCircle = styled.div<StyledCircleProps>`
  display: inline-block;
  width: ${({ size }) => size || "8px"};
  height: ${({ size }) => size || "8px"};
  border-radius: ${({ size }) => size || "8px"};
  background: ${({ background }) => background || "white"};
`;

export default StyledCircle;
