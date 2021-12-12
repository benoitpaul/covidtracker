import dynamic from "next/dynamic";
import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../constants";
import useMedia from "../hooks/useMedia";
import StyledArticle from "../styles/StyledArticle";
import CurrentRegionContext, {
  CurrentRegionContextType,
} from "./CurrentRegionContext";

const DesktopMap: FC = ({ children }) => {
  const { currentRegion } = useContext(
    CurrentRegionContext
  ) as CurrentRegionContextType;

  const isDesktop = useMedia<boolean>(
    [BREAKPOINTS.mobile, BREAKPOINTS.desktop],
    [false, true],
    false
  );

  const Map = useMemo(() => {
    return dynamic(() => import("./HealthRegionsMap/HealthRegionMapProvider"), {
      loading: () => <p>Loading map...</p>,
      ssr: false,
    });
  }, []);

  return (
    <Wrapper>
      <StyledArticle>{children}</StyledArticle>
      <div className="map">
        {isDesktop && <Map zoomToRegion={currentRegion} />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  flex: 1;
  overflow: hidden;
  display: flex;

  article {
    flex: 1;
    @media ${(p) => p.theme.breakpoints.desktop} {
      flex: 0 0 400px;
    }
  }

  .map {
    flex: 1;
    position: relative;

    @media ${(p) => p.theme.breakpoints.mobile} {
      display: none;
    }
  }
`;

export default DesktopMap;
