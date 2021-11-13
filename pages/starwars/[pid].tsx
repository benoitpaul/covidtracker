import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import dynamic from "next/dynamic";
import {
  HealthRegionDailySummary,
  HealthRegionSummaryResponse,
} from "../../types";
import toHealthRegionDailySummary from "../../utils/toHealthRegionDailySummary";


interface Person {
  name: string;
}

interface StarWarsPersonProps {
  person: Person;
  healthRegionDailySummaries: HealthRegionDailySummary[];
}

const StarWarsPerson: NextPage<StarWarsPersonProps> = ({ person, healthRegionDailySummaries }) => {
  const Map = dynamic(
    () => import("../../components/HealthRegionsMap"), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );
  return (
    <>
      <div>{person.name}</div>
      <Map healthRegionDailySummaries={healthRegionDailySummaries} />
    </>
  );
};

interface Params extends ParsedUrlQuery {
  pid: string;
}

export const getStaticProps: GetStaticProps<StarWarsPersonProps, Params> =
  async (context) => {
    const { pid } = context.params!;
    const res = await fetch(`https://swapi.dev/api/people/${pid}`);
    const person = (await res.json()) as Person;

    const summaryRes = await fetch(
      `https://api.opencovid.ca/summary?loc=hr`
    );
    const summaryData = (await summaryRes.json()) as {
      summary: HealthRegionSummaryResponse[];
    };
    const healthRegionDailySummaries = summaryData.summary.map(s => toHealthRegionDailySummary(s));

    return {
      props: {
        healthRegionDailySummaries,
        person
      },
    };
  };

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = Array.from({ length: 10 }, (_, index) => ({
    params: {
      pid: (index + 1).toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default StarWarsPerson;
