import React, { Component } from 'react';
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import Media from 'react-media';
import posed from 'react-pose';
import Logo from './Logo';
import PageTitle from './PageTitle';
import Hamburger from './Hamburger';
import SideNavigation from './SideNavigation';
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

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.hamburger = React.createRef();

    this.state = {
      hamburgerPosition: [],
      isHomepage: props.location === '/',
    };
  }

  componentDidMount = () => {
    const { location } = this.props;

    this.setState({
      isHomepage: location === '/',
    });

    console.log('navigation mounted');
  };

  componentWillUnmount() {
    console.log('navigation unmounted');
  }

  getBurgerLinesPositions = positions => {
    if (Array.isArray(positions)) {
      this.setState({
        hamburgerPosition: positions,
      });
    }
  };

  render() {
    const { location } = this.props;
    const { hamburgerPosition, isHomepage } = this.state;

    return (
      <TransitionState>
        {({ transitionStatus }) => {
          const showSideNav =
            (isHomepage &&
              ['entered', 'entering', 'exiting'].includes(transitionStatus)) ||
            (!isHomepage && transitionStatus === 'exiting');
          return (
            <StyledNavbar className="section">
              <CenteredLogo
                data-testid="logo"
                className={classNames('logo', { centered: isHomepage })}
                pose={location === '/' ? 'centered' : 'normal'}
              >
                <TransitionLink
                  to="/"
                  exit={{
                    length: 2,
                    trigger: props => {
                      console.dir(props);
                    },
                  }}
                  entry={{
                    delay: 0.8,
                    state: {
                      location,
                    },
                  }}
                >
                  <Logo />
                </TransitionLink>
              </CenteredLogo>

              {isHomepage || (
                <div className="page-title" data-testid="page-title">
                  <PageTitle siteTitle="Zach Townsend" pageTitle="Home" />
                </div>
              )}

              <div className="hamburger-container" data-testid="hamburger">
                <Hamburger
                  visible={!showSideNav}
                  onResize={this.getBurgerLinesPositions}
                />
              </div>

              <Media query={{ minWidth: siteTheme.device.desktop }}>
                {matches =>
                  matches ? (
                    <div
                      className="side-navigation-wrapper"
                      style={{
                        visibility: showSideNav ? 'visible' : 'hidden',
                      }}
                    >
                      <SideNavigation
                        data-testid="side-navigation"
                        animateTo={hamburgerPosition}
                        location={location}
                        transition={location === '/' ? 'enter' : 'exit'}
                      />
                    </div>
                  ) : null
                }
              </Media>
            </StyledNavbar>
          );
        }}
      </TransitionState>
    );
  }
}

Navigation.propTypes = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: PropTypes.bool,
  location: PropTypes.string,
  test: PropTypes.object,
};

Navigation.defaultProps = {
  mode: 'offcanvas',
  active: false,
  location: '/',
  test: null,
};

export default Navigation;
