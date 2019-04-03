import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import Media from 'react-media';
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
  .hamburger {
    flex: 0 1 auto;
  }

  .logo {
    display: inline-block;

    @media (min-width: ${({ theme }) => theme.breakpoints.touch}px) {
      &.centered {
        transform: translateX(calc(50vw - 52px));
      }
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

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.hamburger = React.createRef();

    this.state = {
      hamburgerPosition: [],
    };
  }

  getBurgerLinesPositions = positions => {
    if (Array.isArray(positions)) {
      this.setState({
        ...this.state,
        hamburgerPosition: positions,
      });
    }
  };

  render() {
    const { location } = this.props;
    const { hamburgerPosition } = this.state;
    const isHomepage = location === '/';

    return (
      <StyledNavbar className="section">
        <div
          data-testid="logo"
          className={classNames('logo', { centered: isHomepage })}
        >
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {isHomepage || (
          <div className="page-title" data-testid="page-title">
            <PageTitle siteTitle="Zach Townsend" pageTitle="Home" />
          </div>
        )}

        <div className="hamburger-container" data-testid="hamburger">
          <Hamburger
            visible={!isHomepage}
            onResize={this.getBurgerLinesPositions}
          />
        </div>

        <Media query={{ minWidth: siteTheme.breakpoints.touch }}>
          {matches =>
            matches ? (
              <SideNavigation
                data-testid="side-navigation"
                animateTo={hamburgerPosition}
              />
            ) : null
          }
        </Media>
      </StyledNavbar>
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
