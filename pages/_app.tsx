import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import Head from "next/head";
import GlobalStyle from "../styles/GlobalStyles";
import Header from "../components/Header";
import DesktopMap from "../components/DesktopMap";
import { RegionsProvider } from "../components/RegionsContext";
import { CurrentRegionProvider } from "../components/CurrentRegionContext";
import Footer from "../components/Footer";
import { THEME } from "../constants";
import StyledLayout from "../styles/StyledLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={THEME}>
      <>
        <Head>
          <title>Covid Tracker</title>
          <meta
            name="description"
            content="Track COVID-19 coronavirus cases in Canada with active, recoveries and death rate on the map, with daily news and video."
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦠</text></svg>"
          />
        </Head>
        <RegionsProvider>
          <CurrentRegionProvider>
            <GlobalStyle />
            <StyledLayout>
              <Header />
              <main>
                <DesktopMap>
                  <Component {...pageProps} />
                </DesktopMap>
              </main>
              <Footer />
            </StyledLayout>
          </CurrentRegionProvider>
        </RegionsProvider>
      </>
    </ThemeProvider>
  );
}
export default MyApp;
