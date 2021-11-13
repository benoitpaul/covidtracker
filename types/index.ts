export interface HealthRegion {
  HR_UID: number;
  health_region: string;
  health_region_esri: string;
  pop: number;
  province: string;
  province_full: string;
  province_short: string;
}

export interface Province {
  pop: number;
  province: string;
  province_full: string;
  province_short: string;
}

export type RegionsReference = {
  healthRegions: HealthRegion[];
  provinces: Province[];
};

export interface SpotInfo {
  cases: number;
  deaths: number;
  recovered: number;
  testing: number;
  // testingInfo: string;
  avaccine: number; // administered vaccines
  cvaccine: number; // fully vacinated people
  dvaccine: number; // distributed vaccines
}

export interface DailySummary extends SpotInfo {
  date: string;
  activeCases: number;
  activeCasesChange: number;

  cumulative: SpotInfo;
}

export interface ProvinceDailySummary extends DailySummary {
  province: string;
}

export interface HealthRegionDailySummary {
  date: string;
  healthRegion: string;
  province: string;
  cases: number;
  deaths: number;

  cumulative: {
    cases: number;
    deaths: number;
  };
}

// time series

export interface ProvinceTimeseries {
  active?: ProvinceTimeseriesActive[];
  cases?: ProvinceTimeseriesCase[];
  mortality?: ProvinceTimeseriesMortality[];
  recovered?: ProvinceTimeseriesRecovered[];
  avaccine?: ProvinceTimeseriesAvaccine[];
  cvaccine?: ProvinceTimeseriesCvaccine[];
}

export interface ProvinceTimeseriesActive {
  activeCases: number;
  activeCasesChange: number;
  cases: number;
  deaths: number;
  recovered: number;
  date: Date;
  province: string;
}

export interface ProvinceTimeseriesCase {
  cases: number;
  cumulativeCases: number;
  date: Date;
  province: string;
}

export interface ProvinceTimeseriesMortality {
  deaths: number;
  cumulativeDeaths: number;
  date: Date;
  province: string;
}

export interface ProvinceTimeseriesRecovered {
  recovered: number;
  cumulativeRecovered: number;
  date: Date;
  province: string;
}

export interface ProvinceTimeseriesAvaccine {
  avaccine: number;
  cumulativeAvaccine: number;
  date: Date;
  province: string;
}

export interface ProvinceTimeseriesCvaccine {
  cvaccine: number;
  cumulativeCvaccine: number;
  date: Date;
  province: string;
}

// API responses

export interface ProvinceSummaryResponse {
  active_cases: number;
  active_cases_change: number;
  avaccine: number;
  cases: number;
  cumulative_avaccine: number;
  cumulative_cases: number;
  cumulative_cvaccine: number;
  cumulative_deaths: number;
  cumulative_dvaccine: number;
  cumulative_recovered: number;
  cumulative_testing: number;
  cvaccine: number;
  date: string;
  deaths: number;
  dvaccine: number;
  province: string;
  recovered: number;
  testing: number;
  testing_info: string;
}

export interface ProvinceTimeseriesResponse {
  active?: ProvinceTimeseriesActiveResponse[];
  cases?: ProvinceTimeseriesCaseResponse[];
  mortality?: ProvinceTimeseriesMortalityResponse[];
  recovered?: ProvinceTimeseriesRecoveredResponse[];
  avaccine?: ProvinceTimeseriesAvaccineResponse[];
  cvaccine?: ProvinceTimeseriesCvaccineResponse[];
}

export interface ProvinceTimeseriesActiveResponse {
  active_cases: number;
  active_cases_change: number;
  cumulative_cases: number;
  cumulative_deaths: number;
  cumulative_recovered: number;
  date_active: string;
  province: string;
}

export interface ProvinceTimeseriesCaseResponse {
  cases: number;
  cumulative_cases: number;
  date_report: string;
  province: string;
}

export interface ProvinceTimeseriesMortalityResponse {
  deaths: number;
  cumulative_deaths: number;
  date_death_report: string;
  province: string;
}

export interface ProvinceTimeseriesRecoveredResponse {
  recovered: number;
  cumulative_recovered: number;
  date_recovered: string;
  province: string;
}

export interface ProvinceTimeseriesAvaccineResponse {
  avaccine: number;
  cumulative_avaccine: number;
  date_vaccine_administered: string;
  province: string;
}

export interface ProvinceTimeseriesCvaccineResponse {
  cvaccine: number;
  cumulative_cvaccine: number;
  date_vaccine_completed: string;
  province: string;
}

export interface HealthRegionSummaryResponse {
  cases: number;
  cumulative_cases: number;
  cumulative_deaths: number;
  date: string;
  deaths: number;
  health_region: string;
  province: string;
}
