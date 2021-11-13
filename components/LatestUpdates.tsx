import React, { FC } from "react";
import StyledHorizontalSection from "../styles/StyledHorizontalSection";

interface LatestUpdatesProps {
  newCases: number;
  newDeaths: number;
  newVaccines: number;
}

const LatestUpdates: FC<LatestUpdatesProps> = ({
  newCases,
  newDeaths,
  newVaccines,
}) => {
  return (
    <StyledHorizontalSection>
      <h2>Latest Updates</h2>
      <section>
        <h3></h3>
      </section>
    </StyledHorizontalSection>
  );
};

export default LatestUpdates;
