import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";
import { isHealthRegion, HealthRegionOrProvince } from "../types";

interface SearchResultItemProps {
  item: HealthRegionOrProvince;
  onClick: () => void;
}

const SearchResultItem: FC<SearchResultItemProps> = ({ item, onClick }) => {
  return (
    <Wrapper>
      <Link
        href={
          isHealthRegion(item)
            ? `/${item.province_short}/${item.HR_UID}`
            : `/${item.province_short}`
        }
      >
        <a onClick={onClick}>
          {isHealthRegion(item) ? (
            <>
              <span className="primary">{item.health_region}</span>
              <span className="secondary">{item.province_full}</span>
            </>
          ) : (
            <span className="primary">{item.province_full}</span>
          )}
        </a>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  a {
    display: inline-block;
    padding: 0.5em 0em;
    cursor: pointer;

    &:hover {
      .primary {
        text-decoration: underline;
      }
    }

    .primary {
      font-weight: 600;
    }

    .secondary {
      margin-left: 0.5em;

      font-style: italic;
      color: var(--clr-text-darker);
    }
  }
`;

export default SearchResultItem;
