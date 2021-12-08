import React, { FC } from "react";
import styled from "styled-components";
import {
  HealthRegionMapInfo,
  MapMetric,
  MapMetricConfigs,
  MapMetricType,
} from "./constants";

interface InfoBoxProps {
  info?: HealthRegionMapInfo;
}

const InfoxBox: FC<InfoBoxProps> = ({ info }) => {
  const metricValueToString = (
    metric: number,
    metricType: MapMetricType
  ): string => {
    return metricType === "nominal"
      ? metric.toLocaleString()
      : metric.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
          style: "percent",
        });
  };

  const value = (mapMetric: MapMetric) => {
    return metricValueToString(
      info![mapMetric],
      MapMetricConfigs[mapMetric].metricType
    );
  };

  return (
    <Wrapper>
      {info && (
        <>
          <dt>Name:</dt>
          <dd>{info.name}</dd>

          <dt>UID:</dt>
          <dd>{info.HR_UID}</dd>

          <dt>All cases:</dt>
          <dd>{value("cumulative-cases")}</dd>

          <dt>Cases ratio:</dt>
          <dd>{value("cumulative-cases-percentage")}</dd>

          <dt>New cases:</dt>
          <dd>{value("new-cases")}</dd>

          <dt>All deaths:</dt>
          <dd>{value("cumulative-deaths")}</dd>

          <dt>Deaths ratio:</dt>
          <dd>{value("cumulative-deaths-percentage")}</dd>

          <dt>New deaths:</dt>
          <dd>{value("new-deaths")}</dd>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.dl`
  display: grid;
  grid-template-columns: max-content auto; //repeat(auto-fit, minmax(1ch, 1fr));
  gap: 0.5em;

  border-top: solid 1px var(--clr-background-light);
  padding-top: 1em;

  dt {
    grid-column-start: 1;
  }

  dd {
    grid-column-start: 2;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default InfoxBox;
