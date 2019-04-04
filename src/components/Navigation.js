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
    x: '50vw',
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
  };

  // componentWillUnmount = () => {
  //   alert('unmounting');
  // };

  getBurgerLinesPositions = positions => {
    if (Array.isArray(positions)) {
      this.setState({
        hamburgerPosition: positions,
      });
    }
  };

  render() {
    const { location } = this.props;
    const isDestinationHomepage = location === '/';
    const { hamburgerPosition, isHomepage } = this.state;

    return (
      <TransitionState>
        {({ transitionStatus, current, entry, exit }) => (
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
                  state: {
                    location,
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
                visible={!isHomepage && transitionStatus !== 'exiting'}
                onResize={this.getBurgerLinesPositions}
              />
            </div>
            {/* <p style={{ color: 'white' }}>
              {location === '/' ? 'enter' : 'exit'}
            </p> */}
            <Media query={{ minWidth: siteTheme.breakpoints.touch }}>
              {matches =>
                matches ? (
                  <SideNavigation
                    data-testid="side-navigation"
                    animateTo={hamburgerPosition}
                    location={location}
                    transition={location === '/' ? 'enter' : 'exit'}
                  />
                ) : null
              }
            </Media>
          </StyledNavbar>
        )}
      </TransitionState>
    );
  }
}

Navigation.propTypes = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: PropTypes.bool,
  location: PropTypes.string,
};

Navigation.defaultProps = {
  mode: 'offcanvas',
  active: false,
  location: '/',
};

export default Navigation;
