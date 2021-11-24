import React, { FC } from "react";
import { useMap } from "react-leaflet";
import L, { layerGroup } from "leaflet";
import * as geojson from "geojson";

import * as geoProvinces from "../../data/provinces.json";
import * as geoHealthRegions from "../../data/health_regions.json";

const geoProvincesFeature = geoProvinces as unknown as geojson.GeoJsonObject;
const geoHealthRegionsFeature =
  geoHealthRegions as unknown as geojson.GeoJsonObject;

interface ZoomToRegionProps {
  zoomToRegion?: string;
}

const ZoomToRegion: FC<ZoomToRegionProps> = ({ zoomToRegion }) => {
  const map = useMap();
  const provinces = L.geoJSON(geoProvincesFeature);

  const findProvinceLayer = (region: string): L.FeatureGroup | null => {
    const layers = provinces.getLayers();
    const layer = layers.find(
      (layer) =>
        ((layer as L.LayerGroup).feature as geojson.Feature)?.properties
          ?.short_name === zoomToRegion
    );
    return layer as L.FeatureGroup;
  };

  const findHealthRegionsLayer = (region: string): L.FeatureGroup | null => {
    const healthRegions = L.geoJSON(geoHealthRegionsFeature);
    const layers = healthRegions.getLayers();
    const layer = layers.find(
      (layer) =>
        ((layer as L.LayerGroup).feature as geojson.Feature)?.properties
          ?.HR_UID === zoomToRegion
    );
    return layer as L.FeatureGroup;
  };

  if (zoomToRegion) {
    const layer =
      findProvinceLayer(zoomToRegion) || findHealthRegionsLayer(zoomToRegion);
    const bounds = layer ? layer.getBounds() : provinces.getBounds();
    map.fitBounds(bounds);
  } else {
    map.fitBounds(provinces.getBounds());
  }

  return null;
};

export default ZoomToRegion;
