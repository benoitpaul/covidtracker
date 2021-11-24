import React, { ChangeEvent, FC } from "react";
import StyledSwitchField from "../../styles/StyledSwitchField";
import { MapMetric } from "./constants";

interface HealthRegionMetricSwitchFieldProps {
  metric: MapMetric;
  handleMetricChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const HealthRegionMetricSwitchField: FC<HealthRegionMetricSwitchFieldProps> = ({
  metric,
  handleMetricChange,
}) => {
  return (
    <StyledSwitchField>
      <input
        type="radio"
        name="radio-hrmap"
        id="radio-hrmap-cumulative-cases"
        value="cumulative-cases"
        checked={metric === "cumulative-cases"}
        onChange={handleMetricChange}
      />
      <label htmlFor="radio-hrmap-cumulative-cases">All cases</label>
      <input
        type="radio"
        name="radio-hrmap"
        id="radio-hrmap-cumulative-cases-percentage"
        value="cumulative-cases-percentage"
        checked={metric === "cumulative-cases-percentage"}
        onChange={handleMetricChange}
      />
      <label htmlFor="radio-hrmap-cumulative-cases-percentage">
        Cases ratio
      </label>
      <input
        type="radio"
        name="radio-hrmap"
        id="radio-hrmap-new-cases"
        value="new-cases"
        checked={metric === "new-cases"}
        onChange={handleMetricChange}
      />
      <label htmlFor="radio-hrmap-new-cases">New cases</label>

      <input
        type="radio"
        name="radio-hrmap"
        id="radio-hrmap-cumulative-deaths"
        value="cumulative-deaths"
        checked={metric === "cumulative-deaths"}
        onChange={handleMetricChange}
      />
      <label htmlFor="radio-hrmap-cumulative-deaths">All deaths</label>
      <input
        type="radio"
        name="radio-hrmap"
        id="radio-hrmap-cumulative-deaths-percentage"
        value="cumulative-deaths-percentage"
        checked={metric === "cumulative-deaths-percentage"}
        onChange={handleMetricChange}
      />
      <label htmlFor="radio-hrmap-cumulative-deaths-percentage">
        Deaths ratio
      </label>
      <input
        type="radio"
        name="radio-hrmap"
        id="radio-hrmap-new-deaths"
        value="new-deaths"
        checked={metric === "new-deaths"}
        onChange={handleMetricChange}
      />
      <label htmlFor="radio-hrmap-new-deaths">New deaths</label>
    </StyledSwitchField>
  );
};

export default HealthRegionMetricSwitchField;
