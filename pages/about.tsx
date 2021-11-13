import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

const AboutPage: NextPage = () => {
  return (
    <Wrapper>
      <h1>About</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1em;
`;

export default AboutPage;
