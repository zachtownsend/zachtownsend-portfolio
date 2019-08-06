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

const transitionProps = {
  exit: {
    length: 0.8,
    state: {
      foo: 'exit',
    },
  },
  entry: {
    delay: 0.8,
    state: {
      foo: 'enter',
    },
  },
};

const CenteredLogo = posed.div({
  centered: {
    x: 'calc(50vw - 52px)',
    transition: {
      duration: 800,
      ease: 'easeInOut',
    },
  },
  normal: {
    x: 0,
    transition: {
      duration: 800,
      ease: 'easeInOut',
    },
  },
});

export default class MainNavigation extends Component {
  static propTypes = {
    open: PropTypes.bool,
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
    const { open } = this.props;
    const { hamburgerPosition, transitioning } = this.state;

    return (
      <StyledNavbar className="section">
        <CenteredLogo
          data-testid="logo"
          className={classNames('logo', { centered: !open })}
          pose={!open ? 'centered' : 'normal'}
        >
          <TransitionLink
            to="/"
            exit={{
              length: 2,
            }}
            entry={{
              delay: 0.8,
            }}
          >
            <Logo />
          </TransitionLink>
        </CenteredLogo>

        <div className="page-title" data-testid="page-title">
          <PageTitle siteTitle="Zach Townsend" pageTitle="Home" />
        </div>

        <div className="hamburger-container" data-testid="hamburger">
          <Hamburger
            visible={!open && !transitioning}
            onHamburgerPosition={getHamburgerPosition}
          />
        </div>

        <SideNav
          data-testid="side-navigation"
          animateTo={hamburgerPosition}
          onBeforeTransition={() => {
            this.setTransitioning(true);
          }}
          onAfterTransition={() => {
            this.setTransitioning(false);
          }}
          open={open}
        />
      </StyledNavbar>
    );
  }
}
