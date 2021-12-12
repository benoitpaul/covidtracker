import React, { FC } from "react";
import styled from "styled-components";

interface SummaryOnDateProps {
  region: string;
  date: string;
  newCases: number;
  newDeaths: number;
}

const SummaryOnDate: FC<SummaryOnDateProps> = ({
  region,
  date,
  newCases,
  newDeaths,
}) => {
  return (
    <Wrapper>
      <h2>Today summary</h2>
      <p>
        There are <strong>{newCases.toLocaleString()}</strong> new COVID-19
        cases in {region} on <time>{date}</time>.
      </p>
      <p>
        There are <strong>{newDeaths.toLocaleString()}</strong> deaths related
        to COVID-19 in {region} on <time>{date}</time>.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1em;

  p {
    margin: 0;
  }
`;

export default SummaryOnDate;
