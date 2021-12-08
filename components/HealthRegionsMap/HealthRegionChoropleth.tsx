import React, { FC, useRef } from "react";
import { GeoJSON } from "react-leaflet";
import { Feature } from "geojson";
import L, {
  Layer,
  LeafletEvent,
  LeafletEventHandlerFn,
  GeoJSON as LeafletGeoJSON,
} from "leaflet";

import * as geoHealthRegions from "../../data/health_regions.json";
import {
  getColor,
  HealthRegionMapInfo,
  MapMetric,
  MapMetricConfigs,
} from "./constants";

const geoHealthRegionsFeature = geoHealthRegions as unknown as Feature;

interface HealthRegionChoroplethProps {
  infos: HealthRegionMapInfo[];
  mapMetric: MapMetric;
  onMouseOverFeature: (hrUID: string) => void;
}

const HealthRegionChoropleth: FC<HealthRegionChoroplethProps> = ({
  infos,
  mapMetric,
  onMouseOverFeature,
}) => {
  const geoJsonHrRef = useRef<LeafletGeoJSON>(null);

  const getRegionFillColor = (
    mapMetric: MapMetric,
    hrUid: string,
    hrName: string
  ): string => {
    const hrUidNumber = Number(hrUid);
    const hr = infos.find((info) => info.HR_UID === hrUidNumber);
    if (!hr) {
      console.log("no matching HR_UID:", hrUidNumber, hrName);
      return "yellow";
    }
    return getColor(
      hr[mapMetric],
      MapMetricConfigs[mapMetric].colors,
      MapMetricConfigs[mapMetric].classes
    );
  };

  const styleFeature = (feature: any) => {
    return {
      color: "black",
      dashArray: "3",
      weight: 1,
      opacity: 1,
      fillColor: getRegionFillColor(
        mapMetric,
        feature.properties?.HR_UID,
        feature.properties?.ENG_LABEL
      ),
      fillOpacity: 0.75,
    };
  };

  const handleMouseOverFeature: LeafletEventHandlerFn = (e: LeafletEvent) => {
    console.log("handleMouseOverFeature");
    const layer = e.target;
    layer.setStyle({
      color: "black",
      dashArray: "",
      weight: 2,
    });
    layer.bringToFront();

    onMouseOverFeature(layer.feature.properties["HR_UID"]);
  };

  const handleMouseOutFeature: LeafletEventHandlerFn = (e: LeafletEvent) => {
    const layer = e.target;
    console.log("handleMouseOutFeature", layer.feature, mapMetric);
    geoJsonHrRef.current?.resetStyle(layer);
  };

  const handleEachFeature = (feature: Feature, layer: Layer) => {
    layer.on({
      mouseover: handleMouseOverFeature,
      mouseout: handleMouseOutFeature,
    });
  };

  return (
    <GeoJSON
      data={geoHealthRegionsFeature}
      ref={geoJsonHrRef}
      style={styleFeature}
      onEachFeature={handleEachFeature}
    ></GeoJSON>
  );
};

export default HealthRegionChoropleth;
