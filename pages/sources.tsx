import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

const SourcesPage: NextPage = () => {
  return (
    <Wrapper>
      <h1>Sources</h1>
      This COVID tracker uses the date from the{" "}
      <a href="https://opencovid.ca/" target="_blank" rel="noreferrer">
        COVID-19 Open Data Working Group
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1em;
`;

export default SourcesPage;
