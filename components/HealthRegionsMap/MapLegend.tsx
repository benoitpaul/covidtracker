import React, { FC } from "react";
import styled from "styled-components";
import StyledVerticalList from "../../styles/StyledVerticalList";
import { getColor, MapMetricConfig, MapMetricType } from "./constants";

interface MapLegendProps {
  config: MapMetricConfig;
}

type LegendItem = {
  label: string;
  color: string;
};

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

const MapLegend: FC<MapLegendProps> = ({ config }) => {
  const items = config.classes.reduce((cumulative, current, index) => {
    if (index === 0) {
      cumulative.push({
        label: `${metricValueToString(
          0,
          config.metricType
        )} - ${metricValueToString(current, config.metricType)}`,
        color: getColor(current / 2, config.colors, config.classes),
      });
    } else if (index < config.classes.length - 1) {
      cumulative.push({
        label: `${metricValueToString(
          config.classes[index - 1],
          config.metricType
        )} - ${metricValueToString(current, config.metricType)}`,
        color: getColor(
          config.classes[index - 1] + (current - config.classes[index - 1]) / 2,
          config.colors,
          config.classes
        ),
      });
    } else {
      cumulative.push({
        label: `${metricValueToString(current, config.metricType)}+`,
        color: getColor(current + 1, config.colors, config.classes),
      });
    }
    return cumulative;
  }, [] as LegendItem[]);
  return (
    <Wrapper>
      <StyledVerticalList>
        {items.map((item) => (
          <li key={item.label}>
            <span>
              <StyledLegendItemColor color={item.color} />
              <span>{item.label}</span>
            </span>
          </li>
        ))}
      </StyledVerticalList>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  li > span {
    display: flex;
    gap: 1em;
    align-items: center;
  }
`;

interface StyledLegendItemColorProps {
  color: string;
}

const StyledLegendItemColor = styled.i<StyledLegendItemColorProps>`
  display: inline-block;
  height: 18px;
  width: 18px;
  background: ${({ color }) => color};
`;

export default MapLegend;
