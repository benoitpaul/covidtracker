import React, { FC } from "react";
import styled from "styled-components";
import CasesOverview, { CasesOverviewProps } from "./CasesOverview";
import VaccinesOverview, { VaccinesOverviewProps } from "./VaccinesOverview";

interface OverviewProps extends CasesOverviewProps, VaccinesOverviewProps {}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const Overview: FC<OverviewProps> = ({
  avaccine,
  cvaccine,
  population,
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
      <VaccinesOverview
        avaccine={avaccine}
        cvaccine={cvaccine}
        population={population}
      />
      <CasesOverview
        cases={cases}
        casesChange={casesChange}
        activeChange={activeChange}
        active={active}
        deaths={deaths}
        deathsChange={deathsChange}
        recovered={recovered}
        recoveredChange={recoveredChange}
      />
    </Wrapper>
  );
};

export default Overview;
