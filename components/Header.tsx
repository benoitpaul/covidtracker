import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import styled from "styled-components";
import LocationBar from "./LocationBar";
import RegionsContext, { RegionsContextType } from "./RegionsContext";

const Header: FC = () => {
  const router = useRouter();
  const { provinces, healthRegions } = useContext(
    RegionsContext
  ) as RegionsContextType;
  const { prov, hr } = router.query;

  const province = provinces.find((p) => p.province_short === prov);
  const healthRegion = healthRegions.find((h) => h.HR_UID.toString() === hr);

  return (
    <Wrapper>
      <LocationBar
        province={province}
        healthRegion={healthRegion}
      ></LocationBar>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding: 1em;
  background: var(--clr-background-light);
`;

export default Header;
