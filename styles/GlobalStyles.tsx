import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --nord0: #2e3440;
    --nord1: #3b4252;
    --nord2: #434c5e;
    --nord3: #4c566a;
    --nord4: #d8dee9;
    --nord5: #e5e9f0;
    --nord6: #eceff4;
    --nord7: #8fbcbb;
    --nord8: #88c0d0;
    --nord9: #81a1c1;
    --nord10: #5e81ac;
    --nord11: #bf616a;
    --nord12: #d08770;
    --nord13: #ebcb8b;
    --nord14: #a3be8c;
    --nord15: #b48ead;

    --clr-background: var(--nord0);
    --clr-background-light: var(--nord1);
    --clr-background-lighter: var(--nord2);
    --clr-background-lightest: var(--nord3);
    --clr-text: var(--nord6);
    --clr-text-dark: var(--nord5);
    --clr-text-darker: var(--nord4);
    --clr-red: var(--nord11);

    --clr-cases: var(--nord11);
    --clr-deaths: var(--nord3);
    --clr-recovered: var(--nord14);
    --clr-at-least-one-dose: var(--nord8);
    --clr-fully-vaccinated: var(--nord10);
  }

  // box-sizing rules
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  // remove default margin
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    background: var(--clr-background);
    color:var(--clr-text);

    font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, “Roboto”, “Oxygen”,“Ubuntu”, “Cantarell”, “Fira Sans”,“Droid Sans”, “Helvetica Neue”, sans-serif;
  
  }

  /* Scroll bars */
  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--nord3) var(--nord1);
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: var(--nord1);
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--nord3);
    border-radius: 20px;
    border: 3px solid var(--nord3);
  }
  /* End Scoll bars */

  

  a {
     cursor: pointer;
    text-decoration: none;
    border-radius: 0.25em;
    color: var(--nord8);
    transition: text-decoration 200ms ease-in-out 0s;

    &:hover, &:active {
     text-decoration: underline;  
    }
}

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }

    html {
      scroll-behavior: initial;
    }
  }
`;

export default GlobalStyle;
