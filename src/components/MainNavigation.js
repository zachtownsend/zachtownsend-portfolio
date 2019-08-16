import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionLink from 'gatsby-plugin-transition-link';
import styled from 'styled-components';
import Media from 'react-media';
import Logo from './Logo';
import PageTitle from './PageTitle';
import Hamburger from './Hamburger';
import SideNav from './SideNav';
import OffCanvasNav from './OffCanvasNav';

const StyledNavbar = styled.nav`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  background: linear-gradient(180deg,
    hsl(0, 0%, 0%) 0%,
    hsla(0, 0%, 0%, 0.738) 19%,
    hsla(0, 0%, 0%, 0.541) 34%,
    hsla(0, 0%, 0%, 0.382) 47%,
    hsla(0, 0%, 0%, 0.278) 56.5%,
    hsla(0, 0%, 0%, 0.194) 65%,
    hsla(0, 0%, 0%, 0.126) 73%,
    hsla(0, 0%, 0%, 0.075) 80.2%,
    hsla(0, 0%, 0%, 0.042) 86.1%,
    hsla(0, 0%, 0%, 0.021) 91%,
    hsla(0, 0%, 0%, 0.008) 95.2%,
    hsla(0, 0%, 0%, 0.002) 98.2%,
    hsla(0, 0%, 0%, 0) 100%)
  ;

  .logo,
  .hamburger-container {
    flex: 0 1 auto;
  }

  .page-title,
  .hamburger-container {
    position: relative;
    z-index: 1;
  }

  .logo {
    display: inline-block;
    z-index: 2;

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

export const mainNavigationLinks = [
  '/projects',
  '/blog',
  '/workshop',
  '/contact',
];

export default class MainNavigation extends Component {
  static propTypes = {
    open: PropTypes.bool,
    path: PropTypes.string,
    onOffCanvasToggle: PropTypes.func,
    offCanvasOpen: PropTypes.bool,
  };

  static defaultProps = {
    open: true,
    path: null,
    onOffCanvasToggle: null,
    offCanvasOpen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      transitioning: false,
      offCanvasMenuOpen: false,
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
    const { open, path, onOffCanvasToggle, offCanvasOpen } = this.props;
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
          <PageTitle siteTitle="Zach Townsend" path={path} />
        </div>
        <div className="hamburger-container" data-testid="hamburger">
          <Hamburger
            visible={!open && !transitioning}
            onHamburgerPosition={getHamburgerPosition}
            onClick={onOffCanvasToggle}
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
          links={mainNavigationLinks}
        />
        {offCanvasOpen && (
          <OffCanvasNav
            links={mainNavigationLinks}
            onLinkClick={onOffCanvasToggle}
          />
        )}
      </StyledNavbar>
    );
  }
}
