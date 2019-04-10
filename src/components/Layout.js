import React from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider, css } from 'styled-components';
import { Location } from '@reach/router';
import Navigation from './Navigation';
import './all.scss';
import useSiteMetadata from './SiteMetadata';

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
};

export const StyledPageContainer = styled.div`
  background: ${siteTheme.darkGray};
  padding-top: 20px;
  min-height: calc(100vh - 20px);
`;

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <ThemeProvider theme={siteTheme}>
      <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
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
        <Location>
          {({ location }) => <Navigation location={location.pathname} />}
        </Location>
        <StyledPageContainer>{children}</StyledPageContainer>
      </div>
    </ThemeProvider>
  );
};

export default TemplateWrapper;
