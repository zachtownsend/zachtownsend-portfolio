import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { TransitionPortal } from 'gatsby-plugin-transition-link';
import { Location } from '@reach/router';
import MainNavigation from './MainNavigation';
import { siteTheme } from './Layout';
import { getPageTitleFromPath } from '../lib/helpers';

export default function PageContainer({ children }) {
  return (
    <ThemeProvider theme={siteTheme}>
      <div>
        <Location>
          {({ location }) => (
            <TransitionPortal>
              <MainNavigation
                open={location.pathname === '/'}
                pageTitle={getPageTitleFromPath(location.pathname)}
              />
            </TransitionPortal>
          )}
        </Location>
        <div>{children}</div>
      </div>
    </ThemeProvider>
  );
}

PageContainer.propTypes = {
  children: PropTypes.element,
};
