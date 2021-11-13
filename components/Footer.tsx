import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Footer = () => {
  const fullYear = new Date().getFullYear().toString();
  return (
    <Wrapper>
      <ul>
        <li>
          <Link href="/about/">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/sources/">
            <a>Sources</a>
          </Link>
        </li>
      </ul>
      <section className="copyright">
        ©<time dateTime={fullYear}>{fullYear}</time> Benoit Paul. All Rights
        Reserved.
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  padding: 1em;

  font-size: 0.75em;
  background: var(--clr-background-light);

  ul {
    display: flex;
    list-style-type: none;
    gap: 1em;

    margin: 0;
    padding: 0;
  }
`;

export default Footer;
