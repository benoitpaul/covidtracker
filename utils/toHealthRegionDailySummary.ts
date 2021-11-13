import {
  HealthRegionDailySummary,
  HealthRegionSummaryResponse,
} from "../types";

const toHealthRegionDailySummary = (
  data: HealthRegionSummaryResponse
): HealthRegionDailySummary => {
  return {
    province: data.province,
    healthRegion: data.health_region,
    date: data.date,
    cases: data.cases,
    deaths: data.deaths,
    cumulative: {
      cases: data.cumulative_cases,
      deaths: data.cumulative_deaths,
    },
  };
};

export default toHealthRegionDailySummary;
