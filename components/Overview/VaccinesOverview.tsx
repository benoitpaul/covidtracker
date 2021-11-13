import React, { FC } from "react";
import styled from "styled-components";
import StyledCircle from "../../styles/StyledCircle";
import InfoLine from "./InfoLine";

export interface VaccinesOverviewProps {
  avaccine: number;
  cvaccine: number;
  population: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  .administered {
    color: var(--nord10);
    font-size: 1.25rem;
    font-weight: 600;
  }

  .bar {
    position: relative;
    height: 8px;
    border-radius: 8px;

    background: var(--nord2);

    .slice {
      position: absolute;
      height: 100%;
      border-radius: 8px;

      &.at-least-one-dose {
        background: var(--nord8);
      }

      &.fully {
        background: var(--nord10);
      }
    }
  }
`;

const VaccinesOverview: FC<VaccinesOverviewProps> = ({
  avaccine,
  cvaccine,
  population,
}) => {
  const receivedAtLeastOneDosePercentage = (avaccine - cvaccine) / population;
  const fullyVaccinatedPercentage = cvaccine / population;
  return (
    <Wrapper>
      <div>
        <h3>Vaccine doses administered</h3>
        <div className="administered">{avaccine.toLocaleString()}</div>
      </div>
      <div className="bar">
        <div
          className="slice at-least-one-dose"
          style={{ width: `${receivedAtLeastOneDosePercentage * 100}%` }}
        ></div>
        <div
          className="slice fully"
          style={{ width: `${fullyVaccinatedPercentage * 100}%` }}
        ></div>
      </div>
      <InfoLine
        color="var(--clr-at-least-one-dose)"
        description="Received at least one dose"
        value={receivedAtLeastOneDosePercentage.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          style: "percent",
        })}
      />
      <InfoLine
        color="var(--clr-fully-vaccinated)"
        description="Fully vaccinated"
        value={fullyVaccinatedPercentage.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          style: "percent",
        })}
      />
    </Wrapper>
  );
};

export default VaccinesOverview;
