import React from "react";
import styled from "styled-components";

const StyledSwitchField = styled.span`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
  }

  label {
    background-color: var(--clr-background-light);
    color: var(--clr-text);
    line-height: 1;
    text-align: center;
    padding: 0.5em 0.75em;
    margin-right: -1px;
    border: 1px solid var(--clr-background-lighter);
    transition: all 0.1s ease-in-out;
  }

  label:hover {
    cursor: pointer;
  }

  input:focus + label {
    outline: solid 1px white;
    outline-offset: -2px;
  }

  input:checked + label {
    background-color: var(--nord8);
    color: var(--clr-background);
    border: 1px solid var(--nord8);
    box-shadow: none;
  }

  label:first-of-type {
    border-radius: 4px 0 0 4px;
  }

  label:last-of-type {
    border-radius: 0 4px 4px 0;
  }
`;

export default StyledSwitchField;
