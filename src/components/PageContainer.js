import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { TransitionPortal } from 'gatsby-plugin-transition-link';
import { Location } from '@reach/router';
import posed from 'react-pose';
import MainNavigation from './MainNavigation';
import { siteTheme } from './Layout';
import { getPageTitleFromPath } from '../lib/helpers';

const ContentContainer = posed.div({
  menuClosed: { transform: 'scale(1)' },
  menuOpen: { transform: 'scale(0.99)' },
});

export default class PageContainer extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props) {
    super(props);

    this.state = {
      offCanvasOpen: false,
    };
  }

  render() {
    const { children } = this.props;
    const { offCanvasOpen } = this.state;
    return (
      <ThemeProvider theme={siteTheme}>
        <div className="page-layout">
          <Location>
            {({ location }) => (
              <TransitionPortal>
                <MainNavigation
                  open={location.pathname === '/'}
                  offCanvasOpen={offCanvasOpen}
                  onOffCanvasToggle={() => {
                    this.setState({
                      offCanvasOpen: !offCanvasOpen,
                    });
                  }}
                  path={location.pathname}
                />
              </TransitionPortal>
            )}
          </Location>
          {children}
        </div>
      </ThemeProvider>
    );
  }
}
