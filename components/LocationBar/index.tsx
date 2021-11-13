import React, { FC, useState } from "react";
import styled from "styled-components";
import SearchRegion from "./SearchRegion";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { HealthRegion, Province } from "../types";

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 1em 0;
`;

interface StyledPillProps {
  active: boolean;
}

const StyledPill = styled.a<StyledPillProps>`
  padding: 0.5em 0.75em;
  background: ${({ active }) =>
    active ? "var(--nord8)" : "var(--clr-background-lighter)"};
  color: ${({ active }) =>
    active ? "var(--clr-background)" : "var(--clr-text)"};

  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background: var(--nord8);
    color: var(--clr-background);
    text-decoration: none;
  }
`;

const StyledButtonPill = styled.button`
  display: flex;
  gap: 0.5em;
  padding: 0.5em 0.75em;

  border: none;
  border-radius: 8px;

  font-size: 1rem;

  color: var(--clr-text);
  background: var(--clr-background-lighter);
`;

interface LocationBarProps {
  province?: Province;
  healthRegion?: HealthRegion;
}

const LocationBar: FC<LocationBarProps> = ({ province, healthRegion }) => {
  const [showSearch, setShowSearch] = useState(false);
  const active: Province | HealthRegion | null = healthRegion
    ? healthRegion
    : province
    ? province
    : null;
  return (
    <div>
      <StyledSection>
        {healthRegion && province && (
          <Link
            href={`/${province.province_short}/${healthRegion.HR_UID}`}
            passHref={true}
          >
            <StyledPill active={active === healthRegion}>
              {healthRegion.health_region}
            </StyledPill>
          </Link>
        )}
        {province && (
          <Link href={`/${province.province_short}`} passHref={true}>
            <StyledPill active={active === province}>
              {province.province_full}
            </StyledPill>
          </Link>
        )}
        <Link href="/" passHref={true}>
          <StyledPill active={active === null}>Canada</StyledPill>
        </Link>
        <StyledButtonPill
          type="button"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FaSearch />
          Search
        </StyledButtonPill>
      </StyledSection>
      {showSearch && <SearchRegion onClick={() => setShowSearch(false)} />}
    </div>
  );
};

export default LocationBar;
