import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

const AboutPage: NextPage = () => {
  return (
    <Wrapper>
      <h1>About</h1>
      <p>
        Covidtracker.ca is a project to track covid-19 cases and vaccination
        progress accross Canada.
      </p>
      <p>Benoit Paul</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1em;
`;

export default AboutPage;
