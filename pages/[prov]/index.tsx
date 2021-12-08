import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import RegionsContext, {
  RegionsContextType,
} from "../../components/RegionsContext";
import { Province } from "../../components/types";
import {
  ProvinceDailySummary,
  ProvinceSummaryResponse,
  ProvinceTimeseries,
} from "../../types";
import Overview from "../../components/Overview";
import Trends from "../../components/Trends";
import RegionsList from "../../components/RegionsList";
import toProvinceDailySummary from "../../utils/toProvinceDailySummary";
import Head from "next/head";
import toProvinceTimeseries from "../../utils/toProvinceTimeseries";
import getRegionsData from "../../utils/getRegionsData";
import CurrentRegionContext, {
  CurrentRegionContextType,
} from "../../components/CurrentRegionContext";

interface ProvincePageProps {
  provinceCode: string;
  provinceSummary: ProvinceDailySummary;
  provinceTimeseries: ProvinceTimeseries;
}

const ProvincePage: NextPage<ProvincePageProps> = ({
  provinceCode,
  provinceSummary,
  provinceTimeseries,
}) => {
  const { provinces, healthRegions } = useContext(
    RegionsContext
  ) as RegionsContextType;
  const { setCurrentRegion } = useContext(
    CurrentRegionContext
  ) as CurrentRegionContextType;
  const province = provinces.find(
    (p) => p.province === provinceSummary.province
  ) as Province;

  const provinceHealthRegions = healthRegions
    .filter((hr) => hr.province_short === province.province_short)
    .map((hr) => {
      return {
        id: hr.HR_UID.toString(),
        label: hr.health_region,
      };
    });

  useEffect(() => {
    setCurrentRegion(provinceCode);
  }, [provinceCode]);

  return (
    <>
      <Head>
        <title>Covid Tracker - {province.province_full}</title>
      </Head>
      <Wrapper>
        <h1>
          <span>{province.province_full}</span>
          <Image
            src={`/flags/CA-${province.province_short}.svg`}
            alt={`${province.province_full} flag`}
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
          population={province?.pop}
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
        <RegionsList title="Health regions" regions={provinceHealthRegions} />
        {/* <section>
        <h2>Epidemiology</h2>
        <Dashboard>
          <DashboardCard variant="cases">
            <h3 className="label">Cases</h3>
            <div className="value">
              {provinceSummary.cumulative.cases.toLocaleString()}
            </div>
            <div className="change">{toChangeLabel(provinceSummary.cases)}</div>
          </DashboardCard>
          <DashboardCard variant="deaths">
            <h3 className="label">Deaths</h3>
            <div className="value">
              {provinceSummary.cumulative.deaths.toLocaleString()}
            </div>
            <div className="change">
              {toChangeLabel(provinceSummary.deaths)}
            </div>
          </DashboardCard>
          <DashboardCard variant="recovered">
            <h3 className="label">Recovered</h3>
            <div className="value">
              {provinceSummary.cumulative.recovered.toLocaleString()}
            </div>
            <div className="change">
              {toChangeLabel(provinceSummary.recovered)}
            </div>
          </DashboardCard>
        </Dashboard>
      </section>
      <section>
        <h2>Vaccines</h2>
        <Dashboard>
          <DashboardCard variant="dvaccine">
            <h3 className="label">Distributed</h3>
            <div className="value">
              {provinceSummary.cumulative.dvaccine.toLocaleString()}
            </div>
            <div className="change">
              {toChangeLabel(provinceSummary.dvaccine)}
            </div>
          </DashboardCard>
          <DashboardCard variant="avaccine">
            <h3 className="label">Administered</h3>
            <div className="value">
              {provinceSummary.cumulative.avaccine.toLocaleString()}
            </div>
            <div className="change">
              {toChangeLabel(provinceSummary.avaccine)}
            </div>
          </DashboardCard>
          <DashboardCard variant="cvaccine">
            <h3 className="label">Fully</h3>
            <div className="value">
              {provinceSummary.cumulative.cvaccine.toLocaleString()}
            </div>
            <div className="change">
              {toChangeLabel(provinceSummary.cvaccine)}
            </div>
          </DashboardCard>
        </Dashboard>
      </section> */}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
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

const Dashboard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

interface DashboardCardProps {
  variant:
    | "cases"
    | "deaths"
    | "recovered"
    | "testing"
    | "avaccine"
    | "cvaccine"
    | "dvaccine";
}

const DashboardCard = styled.div<DashboardCardProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;

  border-radius: 8px;

  background: ${({ variant }) => {
    switch (variant) {
      case "cases":
        return `var(--clr-cases)`;
      case "deaths":
        return `var(--clr-deaths)`;
      case "recovered":
        return `var(--clr-recovered)`;
      case "testing":
        return `var(--nord11)`;
      case "avaccine":
        return `var(--nord9)`;
      case "cvaccine":
        return `var(--nord7)`;
      case "dvaccine":
        return `var(--nord8)`;
    }
  }};

  .label {
    margin: 0;
    font-size: 1em;
  }

  .value {
    font-size: 1.25rem;
  }

  .change {
    font-size: 0.8em;
  }
`;

interface Params extends ParsedUrlQuery {
  prov: string;
}

export const getStaticProps: GetStaticProps<ProvincePageProps, Params> = async (
  context
) => {
  const { prov } = context.params!;

  const summaryRes = await fetch(
    `https://api.opencovid.ca/summary?loc=${prov}`
  );
  const summaryData = (await summaryRes.json()) as {
    summary: ProvinceSummaryResponse[];
  };
  const provinceSummary = toProvinceDailySummary(summaryData.summary[0]);

  const provinceTimeseriesResponse = await fetch(
    `https://api.opencovid.ca/timeseries?loc=${prov}`
  );

  const provinceTimeseries = toProvinceTimeseries(
    await provinceTimeseriesResponse.json()
  ) as ProvinceTimeseries;

  return {
    props: {
      provinceCode: prov,
      provinceSummary,
      provinceTimeseries,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getRegionsData();
  const paths = data.provinces.map((p) => ({
    params: {
      prov: p.province_short,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ProvincePage;
