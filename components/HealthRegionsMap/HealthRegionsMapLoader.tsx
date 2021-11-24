import React, { FC } from "react";
import useMedia from "../../hooks/useMedia";
import { BREAKPOINTS } from "../../constants";
import HealthRegionMapProvider from "./HealthRegionMapProvider";

interface HealthRegionsMapLoaderProps {
  zoomToRegion?: string;
}

const HealthRegionsMapLoader: FC<HealthRegionsMapLoaderProps> = ({
  zoomToRegion,
}) => {
  const isDesktop = useMedia<boolean>(
    [BREAKPOINTS.mobile, BREAKPOINTS.desktop],
    [false, true],
    false
  );

  return (
    <>{isDesktop && <HealthRegionMapProvider zoomToRegion={zoomToRegion} />}</>
  );
};

export default HealthRegionsMapLoader;
