import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import HealthRegionsMap from ".";
import { HealthRegion, HealthRegionSummaryResponse } from "../../types";
import toHealthRegionDailySummary from "../../utils/toHealthRegionDailySummary";
import RegionsContext, { RegionsContextType } from "../RegionsContext";
import { HealthRegionMapInfo, MapMetric } from "./constants";
import HealthRegionMapControl from "./HealthRegionMapControl";

interface HealthRegionMapProviderProps {
  zoomToRegion?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HealthRegionMapProvider: FC<HealthRegionMapProviderProps> = ({
  zoomToRegion,
}) => {
  const { healthRegions } = useContext(RegionsContext) as RegionsContextType;
  const [mapMetric, setMapMetric] = useState<MapMetric>("cumulative-cases");
  const [mouseOverInfo, setMouseOverInfo] = useState<HealthRegionMapInfo>();

  const { data: healthRegionsResponse } = useSWRImmutable<{
    summary: HealthRegionSummaryResponse[];
  }>(`https://api.opencovid.ca/summary?loc=hr`, fetcher);

  const healthRegionDailySummaries = useMemo(() => {
    return healthRegionsResponse?.summary.map((s) =>
      toHealthRegionDailySummary(s)
    );
  }, [healthRegionsResponse]);

  const aggregated: HealthRegionMapInfo[] = useMemo(() => {
    return (
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
      }) || []
    );
  }, [healthRegionDailySummaries, healthRegions]);

  const handleMapMetricChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMapMetric(e.target.value as MapMetric);
  };

  const handleMouseOverFeature = useCallback(
    (hrUID: string) => {
      console.log({ hrUID });
      const info = aggregated.find((hr) => hr.HR_UID === Number(hrUID));
      console.log({ info });
      setMouseOverInfo(info);
    },
    [aggregated]
  );

  console.log("rendering map");

  return (
    <Wrapper>
      <div className="map-container">
        {aggregated?.length && (
          <HealthRegionsMap
            infos={aggregated}
            mapMetric={mapMetric}
            zoomToRegion={zoomToRegion}
            onMouseOverFeature={handleMouseOverFeature}
          />
        )}
      </div>
      <div className="control-container">
        <HealthRegionMapControl
          mapMetric={mapMetric}
          handleMapMetricChange={handleMapMetricChange}
          mouseOverInfo={mouseOverInfo}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;

  height: 100%;
  width: 100%;

  .map-container {
    flex: 1;
  }

  .control-container {
    flex: 0 0 24em;
  }
`;

export default HealthRegionMapProvider;
