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
    // <StyledSwitchField>
    //   <input
    //     type="radio"
    //     name="radio-hrmap"
    //     id="radio-hrmap-cumulative-cases"
    //     value="cumulative-cases"
    //     checked={metric === "cumulative-cases"}
    //     onChange={handleMetricChange}
    //   />
    //   <label htmlFor="radio-hrmap-cumulative-cases">All cases</label>
    //   <input
    //     type="radio"
    //     name="radio-hrmap"
    //     id="radio-hrmap-cumulative-cases-percentage"
    //     value="cumulative-cases-percentage"
    //     checked={metric === "cumulative-cases-percentage"}
    //     onChange={handleMetricChange}
    //   />
    //   <label htmlFor="radio-hrmap-cumulative-cases-percentage">
    //     Cases ratio
    //   </label>
    //   <input
    //     type="radio"
    //     name="radio-hrmap"
    //     id="radio-hrmap-new-cases"
    //     value="new-cases"
    //     checked={metric === "new-cases"}
    //     onChange={handleMetricChange}
    //   />
    //   <label htmlFor="radio-hrmap-new-cases">New cases</label>

    //   <input
    //     type="radio"
    //     name="radio-hrmap"
    //     id="radio-hrmap-cumulative-deaths"
    //     value="cumulative-deaths"
    //     checked={metric === "cumulative-deaths"}
    //     onChange={handleMetricChange}
    //   />
    //   <label htmlFor="radio-hrmap-cumulative-deaths">All deaths</label>
    //   <input
    //     type="radio"
    //     name="radio-hrmap"
    //     id="radio-hrmap-cumulative-deaths-percentage"
    //     value="cumulative-deaths-percentage"
    //     checked={metric === "cumulative-deaths-percentage"}
    //     onChange={handleMetricChange}
    //   />
    //   <label htmlFor="radio-hrmap-cumulative-deaths-percentage">
    //     Deaths ratio
    //   </label>
    //   <input
    //     type="radio"
    //     name="radio-hrmap"
    //     id="radio-hrmap-new-deaths"
    //     value="new-deaths"
    //     checked={metric === "new-deaths"}
    //     onChange={handleMetricChange}
    //   />
    //   <label htmlFor="radio-hrmap-new-deaths">New deaths</label>
    // </StyledSwitchField>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export default HealthRegionMetricSelector;
