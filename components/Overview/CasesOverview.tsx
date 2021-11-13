import React, { FC } from "react";
import styled from "styled-components";
import StyledCircle from "../../styles/StyledCircle";
import toChangeText from "../../utils/toChangeText";
import InfoLine from "./InfoLine";

export interface CasesOverviewProps {
  active?: number;
  activeChange?: number;
  cases: number;
  casesChange: number;
  deaths: number;
  deathsChange: number;
  recovered?: number;
  recoveredChange?: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  .cases {
    color: var(--clr-cases);
    font-size: 1.25rem;
    font-weight: 600;
  }

  .change {
    padding: 0.25em 0.5em;
    margin-left: 0.5em;
    border-radius: 4px;

    color: var(--clr-text-darker);
    background: var(--clr-background-light);
  }
`;

const CasesOverview: FC<CasesOverviewProps> = ({
  active,
  activeChange,
  cases,
  casesChange,
  deaths,
  deathsChange,
  recovered,
  recoveredChange,
}) => {
  return (
    <Wrapper>
      <div>
        <h3>Total confirmed cases</h3>
        <div>
          <span className="cases">{cases.toLocaleString()}</span>
          <span className="change">{toChangeText(casesChange)}</span>
        </div>
      </div>
      {active && (
        <InfoLine
          color="var(--clr-cases)"
          description="Active cases"
          value={active.toLocaleString()}
          valueChange={toChangeText(activeChange || 0)}
        />
      )}
      <InfoLine
        color="var(--clr-deaths)"
        description="Fatal cases"
        value={deaths.toLocaleString()}
        valueChange={toChangeText(deathsChange)}
      />
      {recovered && (
        <InfoLine
          color="var(--clr-recovered)"
          description="Recovered"
          value={recovered.toLocaleString()}
          valueChange={toChangeText(recoveredChange || 0)}
        />
      )}
    </Wrapper>
  );
};

export default CasesOverview;
