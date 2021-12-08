import { NextPage } from "next";
import React from "react";

const SourcesPage: NextPage = () => {
  return (
    <>
      <h1>Sources</h1>
      This COVID tracker uses the date from the{" "}
      <a href="https://opencovid.ca/" target="_blank" rel="noreferrer">
        COVID-19 Open Data Working Group
      </a>
    </>
  );
};

export default SourcesPage;
