import React, { ChangeEvent, FC, useContext, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RegionsContext, { RegionsContextType } from "/components/RegionsContext";
import chroma, { Color } from "chroma-js";
import data from "../data/health_regions.json";
import geoProvinces from "../data/provinces.json";
import { HealthRegion, HealthRegionDailySummary } from "../types";
import StyledSwitchField from "../styles/StyledSwitchField";
import styled from "styled-components";

type MapDataKey =
  | "cumulative-cases"
  | "cumulative-cases-percentage"
  | "new-cases"
  | "cumulative-deaths"
  | "cumulative-deaths-percentage"
  | "new-deaths";

type MapLegend = {
  colors: Color[];
  classes: number[];
};

const COLORS_CASES = [
  chroma("#bf616a").brighten(2),
  chroma("#bf616a").darken(2),
];

const COLORS_DEATHS = [
  chroma("#3b4252").brighten(2),
  chroma("#3b4252").darken(2),
];

const CLASSES_CUMULATIVE_CASES = [
  1, 500, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 120000,
];

const CLASSES_CUMULATIVE_CASES_PERCENTAGE = [0.01, 0.05, 0.1, 0.15, 0.2];

const CLASSES_NEW_CASES = [1, 5, 15, 20, 30, 50, 75, 100, 200];

const CLASSES_CUMULATIVE_DEATHS = [
  1, 10, 50, 100, 250, 500, 1000, 2000, 3000, 4000,
];

const CLASSES_CUMULATIVE_DEATHS_PERCENTAGE = [
  0.00001, 0.00005, 0.0001, 0.0005, 0.00075, 0.001, 0.002,
];

const CLASSES_NEW_DEATHS = [1, 2, 5, 10, 15, 25, 50, 100, 200];

const MapDataKeyColors: Record<MapDataKey, MapLegend> = {
  "cumulative-cases": {
    colors: COLORS_CASES,
    classes: CLASSES_CUMULATIVE_CASES,
  },
  "cumulative-cases-percentage": {
    colors: COLORS_CASES,
    classes: CLASSES_CUMULATIVE_CASES_PERCENTAGE,
  },
  "new-cases": {
    colors: COLORS_CASES,
    classes: CLASSES_NEW_CASES,
  },
  "cumulative-deaths": {
    colors: COLORS_DEATHS,
    classes: CLASSES_CUMULATIVE_DEATHS,
  },
  "cumulative-deaths-percentage": {
    colors: COLORS_DEATHS,
    classes: CLASSES_CUMULATIVE_DEATHS_PERCENTAGE,
  },
  "new-deaths": {
    colors: COLORS_DEATHS,
    classes: CLASSES_NEW_DEATHS,
  },
};

const getColor = (
  n: number,
  colorHex: Color[],
  classBreaks: number[]
): string => {
  const mapScale = chroma.scale(colorHex).classes(classBreaks);
  const regionColor = n === 0 ? "#ffffff" : mapScale(n).hex();
  return regionColor;
};

interface HealthRegionMapProps {
  healthRegionDailySummaries: HealthRegionDailySummary[];
}

const HealthRegionsMap: FC<HealthRegionMapProps> = ({
  healthRegionDailySummaries,
}) => {
  const { healthRegions } = useContext(RegionsContext) as RegionsContextType;
  const [mapDataKey, setMapDataKey] = useState<MapDataKey>("cumulative-cases");

  const aggregated = healthRegionDailySummaries.map((hr) => {
    const healthRegion = healthRegions.find(
      (region: HealthRegion) =>
        region.health_region === hr.healthRegion &&
        region.province === hr.province
    );

    const calculated = {
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
  });

  /*
  console.log({ aggregated });

  console.log({
    min: aggregated.reduce((acc, current) => {
      console.log(current["new-deaths"]);
      if (current["new-deaths"] < acc) {
        acc = current["new-deaths"];
      }
      return acc;
    }, 1000000000),
    max: aggregated.reduce((acc, current) => {
      if (current["new-deaths"] > acc) {
        acc = current["new-deaths"];
      }
      return acc;
    }, 0),
  });
  */

  const getRegionFillColor = (
    mapDataKey: MapDataKey,
    hrUid: string,
    hrName: string
  ): string => {
    const hrUidNumber = Number(hrUid);
    const hr = aggregated.find((summary) => summary.HR_UID === hrUidNumber);
    if (!hr) {
      console.log("nor matching HR_UID:", hrUidNumber, hrName);
      return "yellow";
    }
    return getColor(
      hr[mapDataKey],
      MapDataKeyColors[mapDataKey].colors,
      MapDataKeyColors[mapDataKey].classes
    );
  };

  const styleFeature = (feature: any) => {
    return {
      color: "grey",
      dashArray: "3",
      weight: 1,
      opacity: 1,
      fillColor: getRegionFillColor(
        mapDataKey,
        feature.properties.HR_UID,
        feature.properties.ENG_LABEL
      ),
      fillOpacity: 1,
    };
  };

  const handleMapDataKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMapDataKey(e.target.value as MapDataKey);
  };

  return (
    <Wrapper>
      <StyledSwitchField>
        <input
          type="radio"
          name="radio-hrmap"
          id="radio-hrmap-cumulative-cases"
          value="cumulative-cases"
          checked={mapDataKey === "cumulative-cases"}
          onChange={handleMapDataKeyChange}
        />
        <label htmlFor="radio-hrmap-cumulative-cases">All cases</label>
        <input
          type="radio"
          name="radio-hrmap"
          id="radio-hrmap-cumulative-cases-percentage"
          value="cumulative-cases-percentage"
          checked={mapDataKey === "cumulative-cases-percentage"}
          onChange={handleMapDataKeyChange}
        />
        <label htmlFor="radio-hrmap-cumulative-cases-percentage">
          Cases ratio
        </label>
        <input
          type="radio"
          name="radio-hrmap"
          id="radio-hrmap-new-cases"
          value="new-cases"
          checked={mapDataKey === "new-cases"}
          onChange={handleMapDataKeyChange}
        />
        <label htmlFor="radio-hrmap-new-cases">New cases</label>

        <input
          type="radio"
          name="radio-hrmap"
          id="radio-hrmap-cumulative-deaths"
          value="cumulative-deaths"
          checked={mapDataKey === "cumulative-deaths"}
          onChange={handleMapDataKeyChange}
        />
        <label htmlFor="radio-hrmap-cumulative-deaths">All deaths</label>
        <input
          type="radio"
          name="radio-hrmap"
          id="radio-hrmap-cumulative-deaths-percentage"
          value="cumulative-deaths-percentage"
          checked={mapDataKey === "cumulative-deaths-percentage"}
          onChange={handleMapDataKeyChange}
        />
        <label htmlFor="radio-hrmap-cumulative-deaths-percentage">
          Deaths ratio
        </label>
        <input
          type="radio"
          name="radio-hrmap"
          id="radio-hrmap-new-deaths"
          value="new-deaths"
          checked={mapDataKey === "new-deaths"}
          onChange={handleMapDataKeyChange}
        />
        <label htmlFor="radio-hrmap-new-deaths">New deaths</label>
      </StyledSwitchField>
      <MapContainer
        center={[53.145743, -95.424717]}
        zoom={4}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: 800, width: "100%" }}
      >
        {/* <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/benoitpaul/ckvxq46kl4fmp14pqeb0din54/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmVub2l0cGF1bCIsImEiOiJja3ZvY2J6bGY2Z3dpMm9xcHJydnIyN251In0.eaxW0MyW-U8z-GoaNFiZjg"
        />
        <GeoJSON data={data} style={styleFeature} />
        <GeoJSON
          data={geoProvinces}
          style={{ color: "green", weight: 0.1, fillOpacity: 0 }}
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default HealthRegionsMap;
