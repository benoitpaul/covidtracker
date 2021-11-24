import dynamic from "next/dynamic";
import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import CurrentRegionContext, {
  CurrentRegionContextType,
} from "./CurrentRegionContext";

const DesktopMap: FC = ({ children }) => {
  const { currentRegion } = useContext(
    CurrentRegionContext
  ) as CurrentRegionContextType;

  const Map = useMemo(() => {
    console.log("create new map");
    return dynamic(() => import("./HealthRegionsMap/HealthRegionsMapLoader"), {
      loading: () => <p>A map is loading</p>,
      ssr: false,
    });
  }, []);

  return (
    <Wrapper>
      <div className="map">
        <Map zoomToRegion={currentRegion} />
      </div>
      <div className="content">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  position: relative;

  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;

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
`;

export default DesktopMap;
