import { ProvinceDailySummary, ProvinceSummaryResponse } from "../types";

const toProvinceDailySummary = (
  data: ProvinceSummaryResponse
): ProvinceDailySummary => {
  return {
    province: data.province,
    date: data.date,
    activeCases: data.active_cases,
    activeCasesChange: data.active_cases_change,

    cases: data.cases,
    deaths: data.deaths,
    recovered: data.recovered,
    testing: data.testing,
    //testingInfo: data.testing_info,
    avaccine: data.avaccine,
    cvaccine: data.cvaccine,
    dvaccine: data.dvaccine,

    cumulative: {
      cases: data.cumulative_cases,
      deaths: data.cumulative_deaths,
      recovered: data.cumulative_recovered,
      testing: data.cumulative_testing,
      avaccine: data.cumulative_avaccine,
      cvaccine: data.cumulative_cvaccine,
      dvaccine: data.cumulative_dvaccine,
    },
  };
};

export default toProvinceDailySummary;
