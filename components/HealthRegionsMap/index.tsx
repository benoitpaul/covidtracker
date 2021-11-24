import React, { FC } from "react";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Feature } from "geojson";
import * as geoProvinces from "../../data/provinces.json";
import styled from "styled-components";
import { HealthRegionMapInfo, MapMetric, MapMetricConfigs } from "./constants";
import MapLegend from "./MapLegend";
import TopRightControlContainer from "./TopRightControlContainer";
import HealthRegionChoropleth from "./HealthRegionChoropleth";
import ZoomToRegion from "./ZoomToRegion";

const geoProvincesFeature = geoProvinces as unknown as Feature;

interface HealthRegionsMapProps {
  infos: HealthRegionMapInfo[];
  mapMetric: MapMetric;
  zoomToRegion?: string;
}

const HealthRegionsMap: FC<HealthRegionsMapProps> = ({
  infos,
  mapMetric,
  zoomToRegion,
}) => {
  return (
    <Wrapper>
      <MapContainer
        center={[53.145743, -95.424717]}
        zoom={4}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/benoitpaul/ckvxq46kl4fmp14pqeb0din54/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmVub2l0cGF1bCIsImEiOiJja3ZvY2J6bGY2Z3dpMm9xcHJydnIyN251In0.eaxW0MyW-U8z-GoaNFiZjg"
        />
        <GeoJSON
          data={geoProvincesFeature}
          style={{ color: "green", weight: 0.1, fillOpacity: 0 }}
        />

        {mapMetric === "cumulative-cases" && (
          <HealthRegionChoropleth mapMetric="cumulative-cases" infos={infos} />
        )}
        {mapMetric === "cumulative-cases-percentage" && (
          <HealthRegionChoropleth
            mapMetric="cumulative-cases-percentage"
            infos={infos}
          />
        )}
        {mapMetric === "new-cases" && (
          <HealthRegionChoropleth mapMetric="new-cases" infos={infos} />
        )}
        {mapMetric === "cumulative-deaths" && (
          <HealthRegionChoropleth mapMetric="cumulative-deaths" infos={infos} />
        )}
        {mapMetric === "cumulative-deaths-percentage" && (
          <HealthRegionChoropleth
            mapMetric="cumulative-deaths-percentage"
            infos={infos}
          />
        )}
        {mapMetric === "new-deaths" && (
          <HealthRegionChoropleth mapMetric="new-deaths" infos={infos} />
        )}
        <ZoomControl position="bottomright" />
        <TopRightControlContainer>
          <MapLegend config={MapMetricConfigs[mapMetric]} />
        </TopRightControlContainer>
        <ZoomToRegion zoomToRegion={zoomToRegion} />
      </MapContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  height: 100%;
`;

// export default React.memo(HealthRegionsMap);
export default HealthRegionsMap;
