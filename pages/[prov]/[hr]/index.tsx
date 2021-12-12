import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CasesOverview from "../../../components/Overview/CasesOverview";
import {
  HealthRegionDailySummary,
  HealthRegionSummaryResponse,
} from "../../../types";
import getRegionsData from "../../../utils/getRegionsData";
import toHealthRegionDailySummary from "../../../utils/toHealthRegionDailySummary";
import CurrentRegionContext, {
  CurrentRegionContextType,
} from "../../../components/CurrentRegionContext";
import RegionHeader from "../../../components/RegionHeader";
import SummaryOnDate from "../../../components/SummaryOnDate";

interface HealthRegionPageProps {
  hrCode: string;
  healthRegionSummary: HealthRegionDailySummary;
}

const HealthRegionPage: NextPage<HealthRegionPageProps> = ({
  hrCode,
  healthRegionSummary,
}) => {
  const { setCurrentRegion } = useContext(
    CurrentRegionContext
  ) as CurrentRegionContextType;

  useEffect(() => {
    setCurrentRegion(hrCode);
  }, [hrCode]);

  return (
    <>
      <Head>
        <title>Covid Tracker - {healthRegionSummary.healthRegion}</title>
      </Head>
      <Wrapper>
        <RegionHeader
          name={healthRegionSummary.healthRegion}
          lastUpdated={healthRegionSummary.date}
        />
        <SummaryOnDate
          region={healthRegionSummary.healthRegion}
          date={healthRegionSummary.date}
          newCases={healthRegionSummary.cases}
          newDeaths={healthRegionSummary.deaths}
        />
        <CasesOverview
          cases={healthRegionSummary.cumulative.cases}
          casesChange={healthRegionSummary.cases}
          deaths={healthRegionSummary.cumulative.deaths}
          deathsChange={healthRegionSummary.deaths}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

interface Params extends ParsedUrlQuery {
  prov: string;
  hr: string;
}

export const getStaticProps: GetStaticProps<HealthRegionPageProps, Params> =
  async (context) => {
    const { hr } = context.params!;

    const summaryRes = await fetch(
      `https://api.opencovid.ca/summary?loc=${hr}`
    );
    const summaryData = (await summaryRes.json()) as {
      summary: HealthRegionSummaryResponse[];
    };
    const healthRegionSummary = toHealthRegionDailySummary(
      summaryData.summary[0]
    );

    return {
      props: {
        hrCode: hr,
        healthRegionSummary,
      },
      revalidate: 3600,
    };
  };

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getRegionsData();
  const paths = data.healthRegions.map((hr) => ({
    params: {
      prov: hr.province_short,
      hr: hr.HR_UID.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default HealthRegionPage;
