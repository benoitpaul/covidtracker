import React, { FC } from "react";
import Image from "next/image";
import styled from "styled-components";

interface RegionHeaderProps {
  name: string;
  flagCode?: string;
  lastUpdated: string;
}

const RegionHeader: FC<RegionHeaderProps> = ({
  name,
  flagCode,
  lastUpdated,
}) => {
  return (
    <Wrapper>
      <h1>
        <span>{name}</span>
        {flagCode && (
          <Image
            src={`/flags/${flagCode}.svg`}
            alt={`${name} flag`}
            width={80}
            height={40}
            priority
          />
        )}
      </h1>
      <span className="last-updated">
        Last updated: <time>{lastUpdated}</time>
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;

  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .last-updated {
    font-size: 0.75rem;
  }
`;

export default RegionHeader;
