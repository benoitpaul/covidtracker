import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CurrentRegionContext, {
  CurrentRegionContextType,
} from "../components/CurrentRegionContext";
import Overview from "../components/Overview";
import RegionsContext, {
  RegionsContextType,
} from "../components/RegionsContext";
import RegionsList from "../components/RegionsList";
import Trends from "../components/Trends";
import {
  ProvinceDailySummary,
  ProvinceSummaryResponse,
  ProvinceTimeseries,
  ProvinceTimeseriesResponse,
} from "../types";
import toProvinceDailySummary from "../utils/toProvinceDailySummary";
import toProvinceTimeseries from "../utils/toProvinceTimeseries";

interface HomePageProps {
  provinceSummary: ProvinceDailySummary;
  provinceTimeseries: ProvinceTimeseries;
}

const Home: NextPage<HomePageProps> = ({
  provinceSummary,
  provinceTimeseries,
}) => {
  const { provinces } = useContext(RegionsContext) as RegionsContextType;
  const { setCurrentRegion } = useContext(
    CurrentRegionContext
  ) as CurrentRegionContextType;

  useEffect(() => {
    setCurrentRegion();
  }, []);

  const population = provinces.reduce((acc, current) => acc + current.pop, 0);

  const provinceRegions = provinces.map((province) => {
    return {
      id: province.province_short,
      label: province.province_full,
    };
  });

  return (
    <Wrapper>
      <Head>
        <title>Covid Tracker</title>
        <meta
          name="description"
          content="Track COVID-19 coronavirus cases in Canada with active, recoveries and death rate on the map, with daily news and video."
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦠</text></svg>"
        />
      </Head>

      <h1>
        <span>Canada</span>
        <Image
          src={`/flags/CA.svg`}
          alt={`Canada flag`}
          width={80}
          height={40}
        />
      </h1>
      <span className="last-updated">
        Last updated: <time>{provinceSummary.date}</time>
      </span>
      <Overview
        avaccine={provinceSummary.cumulative.avaccine}
        cvaccine={provinceSummary.cumulative.cvaccine}
        population={population}
        cases={provinceSummary.cumulative.cases}
        casesChange={provinceSummary.cases}
        activeChange={provinceSummary.activeCasesChange}
        active={provinceSummary.activeCases}
        deaths={provinceSummary.cumulative.deaths}
        deathsChange={provinceSummary.deaths}
        recovered={provinceSummary.cumulative.recovered}
        recoveredChange={provinceSummary.recovered}
      />
      <Trends provinceTimeseries={provinceTimeseries} />
      <RegionsList title="Provinces" regions={provinceRegions} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 2em;

  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .last-updated {
    font-size: 0.75rem;
  }
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const summaryRes = await fetch(`https://api.opencovid.ca/summary?loc=canada`);
  const summaryData = (await summaryRes.json()) as {
    summary: ProvinceSummaryResponse[];
  };
  const provinceSummary = toProvinceDailySummary(summaryData.summary[0]);

  const provinceTimeseriesResponse = await fetch(
    `https://api.opencovid.ca/timeseries?loc=canada`
  );

  const provinceTimeseries = toProvinceTimeseries(
    await provinceTimeseriesResponse.json()
  ) as ProvinceTimeseriesResponse;

  // const healthRegionRes = await fetch(
  //   `https://api.opencovid.ca/summary?loc=hr`
  // );
  // const healthRegionData = (await healthRegionRes.json()) as {
  //   summary: HealthRegionSummaryResponse[];
  // };
  // const healthRegionDailySummaries = healthRegionData.summary.map((s) =>
  //   toHealthRegionDailySummary(s)
  // );

  return {
    props: {
      provinceSummary,
      provinceTimeseries,
    },
    revalidate: 3600,
  };
};

export default Home;
