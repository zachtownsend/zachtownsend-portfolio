import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link';
import styled from 'styled-components';
import posed from 'react-pose';
import classNames from 'classnames';
import Media from 'react-media';
import Logo from './Logo';
import PageTitle from './PageTitle';
import Hamburger from './Hamburger';
import SideNav from './SideNav';
import { siteTheme } from './Layout';

const StyledNavbar = styled.nav`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;

  .logo,
  .hamburger-container {
    flex: 0 1 auto;
  }

  .logo {
    display: inline-block;

    /* @media (min-width: ${({ theme }) => theme.breakpoints.touch}px) {
      &.centered {
        transform: translateX(calc(50vw - 52px));
      }
    } */

    @media (min-width: ${({ theme }) => theme.device.touch}px) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    svg {
      width: 44px;
      height: 44px;
    }
  }

  .page-title {
    flex: 1 1 auto;
    text-align: left;
  }
`;

export default class MainNavigation extends Component {
  static propTypes = {
    open: PropTypes.bool,
    pageTitle: PropTypes.string,
  };

  static defaultProps = {
    open: true,
    pageTitle: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      transitioning: false,
      hamburgerPosition: [],
    };

    this.hamburger = null;
  }

  getHamburgerPosition = positions => {
    if (Array.isArray(positions)) {
      this.setState({
        hamburgerPosition: positions,
      });
    }
  };

  setTransitioning = status => {
    const { transitioning } = this.state;
    if (status !== transitioning) {
      this.setState(prevState => ({
        ...prevState,
        transitioning: status,
      }));
    }
  };

  render() {
    const { getHamburgerPosition } = this;
    const { open, pageTitle } = this.props;
    const { hamburgerPosition, transitioning } = this.state;

    return (
      <StyledNavbar className="section">
        <TransitionLink
          className="logo centered"
          to="/"
          exit={{ length: 0.8 }}
          entry={{ delay: 0.8, length: 0.8 }}
        >
          <Logo />
        </TransitionLink>

        <div className="page-title" data-testid="page-title">
          <PageTitle siteTitle="Zach Townsend" pageTitle={pageTitle} />
        </div>

        <div className="hamburger-container" data-testid="hamburger">
          <Hamburger
            visible={!open && !transitioning}
            onHamburgerPosition={getHamburgerPosition}
          />
        </div>

        <SideNav
          data-testid="side-navigation"
          hamburgerLinePositions={hamburgerPosition}
          onBeforeTransition={() => {
            this.setTransitioning(true);
          }}
          onAfterTransition={() => {
            this.setTransitioning(false);
          }}
          open={open}
          visible={open || transitioning}
        />
      </StyledNavbar>
    );
  }
}
