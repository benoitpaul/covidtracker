import React, { FC } from "react";
import styled from "styled-components";

const TopRightControlContainer: FC = ({ children }) => {
  return (
    <Wrapper className="leaflet-control-container">
      <div className="leaflet-top leaflet-right">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TopRightControlContainer;
