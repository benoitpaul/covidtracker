import {
  ProvinceTimeseries,
  ProvinceTimeseriesActive,
  ProvinceTimeseriesActiveResponse,
  ProvinceTimeseriesAvaccine,
  ProvinceTimeseriesAvaccineResponse,
  ProvinceTimeseriesCase,
  ProvinceTimeseriesCaseResponse,
  ProvinceTimeseriesCvaccine,
  ProvinceTimeseriesCvaccineResponse,
  ProvinceTimeseriesMortality,
  ProvinceTimeseriesMortalityResponse,
  ProvinceTimeseriesRecovered,
  ProvinceTimeseriesRecoveredResponse,
  ProvinceTimeseriesResponse,
} from "../types";
import ddMMYYYYtoDate from "./ddMMYYYtoDate";

export const toProvinceTimeseriesActive = (
  response: ProvinceTimeseriesActiveResponse
): ProvinceTimeseriesActive => {
  return {
    activeCases: response.active_cases,
    activeCasesChange: response.active_cases_change,
    cases: response.cumulative_cases,
    deaths: response.cumulative_deaths,
    recovered: response.cumulative_recovered,
    date: ddMMYYYYtoDate(response.date_active),
    province: response.province,
  };
};

export const toProvinceTimeseriesCase = (
  response: ProvinceTimeseriesCaseResponse
): ProvinceTimeseriesCase => {
  return {
    cases: response.cases,
    cumulativeCases: response.cumulative_cases,
    date: ddMMYYYYtoDate(response.date_report),
    province: response.province,
  };
};

export const toProvinceTimeseriesMortality = (
  response: ProvinceTimeseriesMortalityResponse
): ProvinceTimeseriesMortality => {
  return {
    deaths: response.deaths,
    cumulativeDeaths: response.cumulative_deaths,
    date: ddMMYYYYtoDate(response.date_death_report),
    province: response.province,
  };
};

export const toProvinceTimeseriesRecovered = (
  response: ProvinceTimeseriesRecoveredResponse
): ProvinceTimeseriesRecovered => {
  return {
    recovered: response.recovered,
    cumulativeRecovered: response.cumulative_recovered,
    date: ddMMYYYYtoDate(response.date_recovered),
    province: response.province,
  };
};

export const toProvinceTimeseriesAvaccine = (
  response: ProvinceTimeseriesAvaccineResponse
): ProvinceTimeseriesAvaccine => {
  return {
    avaccine: response.avaccine,
    cumulativeAvaccine: response.cumulative_avaccine,
    date: ddMMYYYYtoDate(response.date_vaccine_administered),
    province: response.province,
  };
};

export const toProvinceTimeseriesCvaccine = (
  response: ProvinceTimeseriesCvaccineResponse
): ProvinceTimeseriesCvaccine => {
  return {
    cvaccine: response.cvaccine,
    cumulativeCvaccine: response.cumulative_cvaccine,
    date: ddMMYYYYtoDate(response.date_vaccine_completed),
    province: response.province,
  };
};

const toProvinceTimeseries = (
  response: ProvinceTimeseriesResponse
): ProvinceTimeseries => {
  return {
    active: response.active?.map((r) => toProvinceTimeseriesActive(r)),
    cases: response.cases?.map((r) => toProvinceTimeseriesCase(r)),
    mortality: response.mortality?.map((r) => toProvinceTimeseriesMortality(r)),
    recovered: response.recovered?.map((r) => toProvinceTimeseriesRecovered(r)),
    avaccine: response.avaccine?.map((r) => toProvinceTimeseriesAvaccine(r)),
    cvaccine: response.cvaccine?.map((r) => toProvinceTimeseriesCvaccine(r)),
  };
};

export default toProvinceTimeseries;
