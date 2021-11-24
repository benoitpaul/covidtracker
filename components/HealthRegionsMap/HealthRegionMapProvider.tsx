import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import HealthRegionsMap from ".";
import { HealthRegion, HealthRegionSummaryResponse } from "../../types";
import toHealthRegionDailySummary from "../../utils/toHealthRegionDailySummary";
import RegionsContext, { RegionsContextType } from "../RegionsContext";
import { HealthRegionMapInfo, MapMetric } from "./constants";
import HealthRegionMetricSwitchField from "./HealthRegionMetricSwitchField";

interface HealthRegionMapProviderProps {
  zoomToRegion?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HealthRegionMapProvider: FC<HealthRegionMapProviderProps> = ({
  zoomToRegion,
}) => {
  const { healthRegions } = useContext(RegionsContext) as RegionsContextType;
  const [mapMetric, setMapMetric] = useState<MapMetric>("cumulative-cases");

  const { data: healthRegionsResponse } = useSWRImmutable<{
    summary: HealthRegionSummaryResponse[];
  }>(`https://api.opencovid.ca/summary?loc=hr`, fetcher);

  const healthRegionDailySummaries = useMemo(() => {
    return healthRegionsResponse?.summary.map((s) =>
      toHealthRegionDailySummary(s)
    );
  }, [healthRegionsResponse]);

  const aggregated: HealthRegionMapInfo[] =
    healthRegionDailySummaries?.map((hr) => {
      const healthRegion = healthRegions.find(
        (region: HealthRegion) =>
          region.health_region === hr.healthRegion &&
          region.province === hr.province
      );

      const calculated: HealthRegionMapInfo = {
        name: hr.healthRegion,
        "cumulative-cases": hr.cumulative.cases,
        "cumulative-cases-percentage": healthRegion
          ? hr.cumulative.cases / healthRegion.pop
          : 0,
        "new-cases": hr.cases,
        "cumulative-deaths": hr.cumulative.deaths,
        "cumulative-deaths-percentage": healthRegion
          ? hr.cumulative.deaths / healthRegion.pop
          : 0,
        "new-deaths": hr.deaths,
      };

      return {
        ...hr,
        ...healthRegion,
        ...calculated,
      };
    }) || [];

  const handleMapMetricChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMapMetric(e.target.value as MapMetric);
  };
  return (
    <>
      <HealthRegionMetricSwitchField
        metric={mapMetric}
        handleMetricChange={handleMapMetricChange}
      />
      {aggregated?.length && (
        <HealthRegionsMap
          infos={aggregated}
          mapMetric={mapMetric}
          zoomToRegion={zoomToRegion}
        />
      )}
    </>
  );
};

export default HealthRegionMapProvider;
