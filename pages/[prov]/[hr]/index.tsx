import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import CasesOverview from "../../../components/Overview/CasesOverview";
import {
  HealthRegionDailySummary,
  HealthRegionSummaryResponse,
} from "../../../types";
import getRegionsData from "../../../utils/getRegionsData";
import toHealthRegionDailySummary from "../../../utils/toHealthRegionDailySummary";

interface HealthRegionPageProps {
  healthRegionSummary: HealthRegionDailySummary;
}

const HealthRegionPage: NextPage<HealthRegionPageProps> = ({
  healthRegionSummary,
}) => {
  return (
    <>
      <Head>
        <title>Covid Tracker - {healthRegionSummary.healthRegion}</title>
      </Head>
      <Wrapper>
        <h1>
          <span>{healthRegionSummary.healthRegion}</span>
        </h1>
        <span className="last-updated">
          Last updated: <time>{healthRegionSummary.date}</time>
        </span>
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

  padding: 1em;

  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .last-updated {
    font-size: 0.75rem;
  }
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
        healthRegionSummary,
      },
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
