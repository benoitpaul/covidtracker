import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import StyledVerticalList from "../styles/StyledVerticalList";
import { HealthRegion } from "./types";

interface RegionsListProps {
  title: string;
  regions: {
    id: string;
    label: string;
  }[];
}

const Wrapper = styled.section`
  a {
    display: inline-block;
    padding: 0.25em 0em;
  }
`;

const RegionsList: FC<RegionsListProps> = ({ title, regions }) => {
  const { asPath } = useRouter();
  return (
    <Wrapper>
      <h2>{title}</h2>
      <StyledVerticalList>
        {regions.map((region) => (
          <li key={region.id}>
            <Link href={`${asPath}${region.id}/`}>
              <a>{region.label}</a>
            </Link>
          </li>
        ))}
      </StyledVerticalList>
    </Wrapper>
  );
};

export default RegionsList;
