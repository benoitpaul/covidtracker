import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { HealthRegionMapInfo, MapMetric, MapMetricConfigs } from "./constants";
import HealthRegionMetricSelector from "./HealthRegionMetricSelector";
import InfoxBox from "./InfoxBox";
import MapLegend from "./MapLegend";

interface HealthRegionMapControlProps {
  mapMetric: MapMetric;
  handleMapMetricChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  mouseOverInfo?: HealthRegionMapInfo;
}

const HealthRegionMapControl: FC<HealthRegionMapControlProps> = ({
  mapMetric,
  handleMapMetricChange,
  mouseOverInfo,
}) => {
  return (
    <Wrapper>
      <HealthRegionMetricSelector
        mapMetric={mapMetric}
        handleMapMetricChange={handleMapMetricChange}
      />
      <MapLegend config={MapMetricConfigs[mapMetric]} />
      <InfoxBox info={mouseOverInfo} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 24em;
  padding: 1em;

  display: flex;
  flex-direction: column;
  gap: 1em;

  font-size: 0.8rem;
`;

export default HealthRegionMapControl;
