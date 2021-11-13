import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";
import StyledVerticalList from "../../styles/StyledVerticalList";
import RegionsContext, { RegionsContextType } from "../RegionsContext";
import { HealthRegionOrProvince } from "../types";
import SearchResultItem from "./SearchResultItem";

const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
};

interface SearchRegionsProps {
  onClick: () => void;
}

const SearchRegion: FC<SearchRegionsProps> = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { healthRegions, provinces } = useContext(
    RegionsContext
  ) as RegionsContextType;
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [searchResult, setSearchResult] = useState<HealthRegionOrProvince[]>(
    []
  );

  useEffect(() => {
    const search = async (term: string): Promise<HealthRegionOrProvince[]> => {
      return new Promise((resolve) => {
        const normalizedTerm = normalizeString(term);
        if (normalizedTerm === "") {
          resolve([]);
          return;
        }

        const matchHrs = healthRegions.filter((hr) =>
          normalizeString(hr.health_region).includes(normalizedTerm)
        );
        const matchProvinces = provinces.filter(
          (prov) =>
            normalizeString(prov.province_full).includes(normalizedTerm) ||
            normalizeString(prov.province_short).includes(normalizedTerm)
        );
        resolve([...matchHrs, ...matchProvinces]);
      });
    };

    search(debouncedSearchTerm).then((result) => setSearchResult(result));
  }, [debouncedSearchTerm]);

  return (
    <Wrapper>
      <div className="input-container">
        <FaSearch className="input-icon" />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search a region"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section>
        <StyledVerticalList>
          {searchResult.map((item, index) => (
            <SearchResultItem key={index} item={item} onClick={onClick} />
          ))}
        </StyledVerticalList>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  .input-container {
    display: flex;
    align-items: center;
    gap: 1em;

    padding: 0.5em 1em;
    background: white;

    border-radius: 6px;

    .input-icon {
      color: var(--clr-background);
    }

    input {
      width: 100%;

      font-size: 1rem;
      line-height: 1.5;
      border: none;
    }
  }
`;

export default SearchRegion;
