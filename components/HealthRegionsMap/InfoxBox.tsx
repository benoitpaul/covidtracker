import React, { FC } from "react";
import styled from "styled-components";
import { HealthRegionMapInfo } from "./constants";

interface InfoBoxProps {
  info?: HealthRegionMapInfo;
}

const InfoxBox: FC<InfoBoxProps> = ({ info }) => {
  return (
    <Wrapper>
      <div className="leaflet-control leaflet-bar">
        {info && (
          <div>
            <span>Name:</span>
            <span>{info.name}</span>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .leaflet-bar {
    background: var(--clr-background);
    padding: 1em;
  }
`;

export default InfoxBox;
