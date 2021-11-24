import chroma, { Color } from "chroma-js";

export type MapMetric =
  | "cumulative-cases"
  | "cumulative-cases-percentage"
  | "new-cases"
  | "cumulative-deaths"
  | "cumulative-deaths-percentage"
  | "new-deaths";

export type MapMetricType = "nominal" | "percentage";

export type MapMetricConfig = {
  colors: Color[];
  classes: number[];
  metricType: MapMetricType;
};

const COLORS_CASES = [
  chroma("#bf616a").brighten(2),
  chroma("#bf616a").darken(2),
];

const COLORS_DEATHS = [
  chroma("#3b4252").brighten(2),
  chroma("#3b4252").darken(2),
];

const CLASSES_CUMULATIVE_CASES = [
  1, 500, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 120000,
];

const CLASSES_CUMULATIVE_CASES_PERCENTAGE = [0.01, 0.05, 0.1, 0.15, 0.2];

const CLASSES_NEW_CASES = [1, 5, 15, 20, 30, 50, 75, 100, 200];

const CLASSES_CUMULATIVE_DEATHS = [
  1, 10, 50, 100, 250, 500, 1000, 2000, 3000, 4000,
];

const CLASSES_CUMULATIVE_DEATHS_PERCENTAGE = [
  0.00001, 0.00005, 0.0001, 0.0005, 0.00075, 0.001, 0.002,
];

const CLASSES_NEW_DEATHS = [1, 2, 5, 10, 15, 25, 50, 100, 200];

export const MapMetricConfigs: Record<MapMetric, MapMetricConfig> = {
  "cumulative-cases": {
    colors: COLORS_CASES,
    classes: CLASSES_CUMULATIVE_CASES,
    metricType: "nominal",
  },
  "cumulative-cases-percentage": {
    colors: COLORS_CASES,
    classes: CLASSES_CUMULATIVE_CASES_PERCENTAGE,
    metricType: "percentage",
  },
  "new-cases": {
    colors: COLORS_CASES,
    classes: CLASSES_NEW_CASES,
    metricType: "nominal",
  },
  "cumulative-deaths": {
    colors: COLORS_DEATHS,
    classes: CLASSES_CUMULATIVE_DEATHS,
    metricType: "nominal",
  },
  "cumulative-deaths-percentage": {
    colors: COLORS_DEATHS,
    classes: CLASSES_CUMULATIVE_DEATHS_PERCENTAGE,
    metricType: "percentage",
  },
  "new-deaths": {
    colors: COLORS_DEATHS,
    classes: CLASSES_NEW_DEATHS,
    metricType: "nominal",
  },
};

export const getColor = (
  n: number,
  colorHex: Color[],
  classBreaks: number[]
): string => {
  const mapScale = chroma.scale(colorHex).classes(classBreaks);
  const regionColor = n === 0 ? "#ffffff" : mapScale(n).hex();
  return regionColor;
};

export interface HealthRegionMapInfo {
  name: string;
  HR_UID?: number;
  "cumulative-cases": number;
  "cumulative-cases-percentage": number;
  "new-cases": number;
  "cumulative-deaths": number;
  "cumulative-deaths-percentage": number;
  "new-deaths": number;
}
