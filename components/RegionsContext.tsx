import React, { FC, useEffect, useState } from "react";
import data from "../data/regions.json";
import { HealthRegion, Province } from "./types";

export type RegionsContextType = {
  healthRegions: HealthRegion[];
  provinces: Province[];
};

const RegionsContext = React.createContext<RegionsContextType | null>(null);

export const RegionsProvider: FC = ({ children }) => {
  const [regions, setRegions] = useState<RegionsContextType>(data);

  return (
    <RegionsContext.Provider value={regions}>
      {children}
    </RegionsContext.Provider>
  );
};

export default RegionsContext;
