import React, { FC } from "react";
import styled from "styled-components";
import StyledCircle from "../../styles/StyledCircle";
import StyledValueChange from "../../styles/StyledValueChange";

interface InfoLineProps {
  color: string;
  description: string;
  value: string;
  valueChange?: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .label span {
    margin-left: 0.5em;
  }

  .value {
    color: var(--clr-text-darker);

    span + span {
      margin-left: 0.5em;
    }
  }
`;

const InfoLine: FC<InfoLineProps> = ({
  color,
  description,
  value,
  valueChange,
}) => {
  return (
    <Wrapper>
      <div className="label">
        <StyledCircle background={color} />
        <span>{description}</span>
      </div>
      <div className="value">
        <span>{value}</span>
        {valueChange && <StyledValueChange>{valueChange}</StyledValueChange>}
      </div>
    </Wrapper>
  );
};

export default InfoLine;
