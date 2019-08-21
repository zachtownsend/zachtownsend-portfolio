import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
// import Navigation from './Navigation';
import './all.scss';
import useSiteMetadata from './SiteMetadata';
import SmoothScrollContainer from './SmoothScrollContainer';

const settings = {
  pagePadding: 20,
};

export const LayoutWrapper = styled.div`
  background: ${({ theme }) => theme.darkGray};
  min-height: calc(100vh - ${settings.pagePadding * 2}px);
`;

const sizes = {
  mobile: 0,
  tablet: 769,
  touch: 1023,
  desktop: 1215,
  widescreen: 1407,
};

export const siteTheme = {
  primary: '#DA071F',
  black: '#000',
  gray: '#535556',
  lightGray: '#9C9C9B',
  white: '#fff',
  darkGray: '#0E0D0D',
  bodyFontFamily: "'Open Sans', sans-serif",
  displayFontFamily: "'Roboto', sans-serif",
  device: sizes,
  fullHeight: `calc(100vh - ${settings.pagePadding * 2}px)`,
};

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <ThemeProvider theme={siteTheme}>
      <SmoothScrollContainer className="page-container">
        <Helmet>
          <html lang="en" />
          <title>{title} | Freelance Web Developer based in Berlin</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <LayoutWrapper>{children}</LayoutWrapper>
      </SmoothScrollContainer>
    </ThemeProvider>
  );
};

export default TemplateWrapper;
