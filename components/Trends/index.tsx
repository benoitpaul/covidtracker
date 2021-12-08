import React, { FC } from "react";
import styled from "styled-components";

import { ProvinceTimeseries } from "../../types";
import ActiveCasesChart from "./ActiveCasesChart";
import CumulativeSpreadChart from "./CumulativeSpreadChart";
import CumulativeVaccinationsChart from "./CumulativeVaccinationsChart";
import DailySpreadChart from "./DailySpreadChart";

interface TrendsProps {
  provinceTimeseries: ProvinceTimeseries;
}

const Trends: FC<TrendsProps> = ({ provinceTimeseries }) => {
  const { active, cases, mortality, recovered, avaccine, cvaccine } =
    provinceTimeseries;
  return (
    <Wrapper>
      <h2>Trends</h2>
      {active && <CumulativeSpreadChart active={active} />}
      {active && <ActiveCasesChart active={active} />}
      {cases && mortality && recovered && (
        <DailySpreadChart
          cases={cases}
          mortality={mortality}
          recovered={recovered}
        />
      )}
      {avaccine && cvaccine && (
        <CumulativeVaccinationsChart avaccine={avaccine} cvaccine={cvaccine} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default Trends;
