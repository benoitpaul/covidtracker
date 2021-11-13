import dynamic from "next/dynamic";
import React, { FC } from "react";
import styled from "styled-components";
import { HealthRegionDailySummary } from "../types";

interface DesktopMapProps {
  healthRegionDailySummaries: HealthRegionDailySummary[];
}

const DesktopMap: FC<DesktopMapProps> = ({
  healthRegionDailySummaries,
  children,
}) => {
  const Map = dynamic(
    () => import("./HealthRegionsMap"), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false,
    }
  );
  return (
    <Wrapper>
      <div className="map">
        <Map healthRegionDailySummaries={healthRegionDailySummaries} />
      </div>
      <div className="content">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .map {
    @media ${(p) => p.theme.breakpoints.mobile} {
      display: none;
    }
  }

  .content {
    background: var(--clr-background);
    z-index: 2000;
    border-radius: 8px;
    padding: 1em;

    @media ${(p) => p.theme.breakpoints.desktop} {
      position: absolute;
      top: 80px;
      bottom: 40px;
      left: 40px;
      width: 400px;

      overflow-y: auto;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 2em;

  padding: 1em;
`;

export default DesktopMap;
