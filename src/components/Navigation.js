import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from './Logo';
import PageTitle from './PageTitle';
import Hamburger from './Hamburger';
import SideNavigation from './SideNavigation';

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
      hamburgerPosition: []
    };
  }

  componentDidMount() {
    this.getBurgerLinesPositions();
  }

  getBurgerLinesPositions = positions => {
    if (Array.isArray(positions)) {
      this.setState({
        ...this.state,
        hamburgerPosition: positions
      });
    }
  };

  render() {
    const { hamburgerPosition } = this.state;

    return (
      <StyledNavbar className="section">
        <Link className="logo" to="/">
          <Logo />
        </Link>

        <PageTitle
          className="page-title"
          siteTitle="Zach Townsend"
          pageTitle="Home"
        />

        <Hamburger
          className="hamburger"
          onResize={this.getBurgerLinesPositions}
        />
        <SideNavigation animateTo={hamburgerPosition} />
      </StyledNavbar>
    );
  }
}

Navigation.propTypes = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: PropTypes.bool
};

Navigation.defaultProps = {
  mode: 'offcanvas',
  active: false,
};

export default Navigation;
