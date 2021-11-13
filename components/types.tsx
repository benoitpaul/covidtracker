export interface HealthRegion {
  HR_UID: number;
  health_region: string;
  health_region_esri: string;
  pop: number;
  province: string;
  province_full: string;
  province_short: string;
}

export interface Province {
  pop: number;
  province: string;
  province_full: string;
  province_short: string;
}

export type HealthRegionOrProvince = HealthRegion | Province;

export const isHealthRegion = (object: any): object is HealthRegion => {
  return "HR_UID" in object;
};

export const isProvince = (object: any): object is Province => {
  return !("health_region" in object);
};
