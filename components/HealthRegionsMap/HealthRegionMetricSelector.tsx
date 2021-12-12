import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import StyledSwitchField from "../../styles/StyledSwitchField";
import { MapMetric } from "./constants";

interface HealthRegionMetricSelectorProps {
  mapMetric: MapMetric;
  handleMapMetricChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const HealthRegionMetricSelector: FC<HealthRegionMetricSelectorProps> = ({
  mapMetric,
  handleMapMetricChange,
}) => {
  return (
    <Wrapper>
      <label htmlFor="health-region-metric-selector">Select metric:</label>
      <select
        id="health-region-metric-selector"
        value={mapMetric}
        onChange={handleMapMetricChange}
      >
        <option value="cumulative-cases">All cases</option>
        <option value="cumulative-cases-percentage">Cases ratio</option>
        <option value="new-cases">New cases</option>
        <option value="cumulative-deaths">All deaths</option>
        <option value="cumulative-deaths-percentage">Death ratio</option>
        <option value="new-deaths">New deaths</option>
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export default HealthRegionMetricSelector;
