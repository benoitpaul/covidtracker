import React, { FC, useState } from "react";

export type CurrentRegionContextType = {
  currentRegion?: string;
  setCurrentRegion: (region?: string) => void;
};

const CurrentRegionContext =
  React.createContext<CurrentRegionContextType | null>(null);

export const CurrentRegionProvider: FC = ({ children }) => {
  const [currentRegion, setCurrentRegion] = useState<string | undefined>();

  return (
    <CurrentRegionContext.Provider value={{ currentRegion, setCurrentRegion }}>
      {children}
    </CurrentRegionContext.Provider>
  );
};

export default CurrentRegionContext;
