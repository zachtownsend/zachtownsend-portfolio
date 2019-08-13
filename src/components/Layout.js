import React from 'react';
import {
  TransitionPortal,
  TransitionState,
} from 'gatsby-plugin-transition-link';
import { ThemeProvider } from 'styled-components';
import { Location } from '@reach/router';
// import Navigation from './Navigation';
import MainNavigation from './MainNavigation';
import './all.scss';
import PageContainer from './PageContainer';

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

export const getPageTitleFromPath = location => {
  if (/^\/projects(\/.+)?/.test(location)) {
    return 'Projects';
  }

  if (/^\/workshop(\/.+)?/.test(location)) {
    return 'Workshop';
  }

  if (/^\/contact(\/.+)?/.test(location)) {
    return 'Contact';
  }

  if (/^\/blog(\/.+)?/.test(location)) {
    return 'Blog';
  }

  return null;
};

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={siteTheme}>
    <div>
      <Location>
        {({ location }) => (
          <MainNavigation
            open={location.pathname === '/'}
            pageTitle={getPageTitleFromPath(location.pathname)}
          />
        )}
      </Location>
      <PageContainer>{children}</PageContainer>
    </div>
  </ThemeProvider>
);

export default TemplateWrapper;
