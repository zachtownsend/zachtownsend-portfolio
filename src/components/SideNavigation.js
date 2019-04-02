import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledSideNavigation = styled.nav`
  position: absolute;
  right: 0;
  width: 33vw;
  height: calc(100vh - 40px);
  top: 0;
  text-align: right;
  padding: 0 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ul {
    li {
      font-size: 36px;
      font-family: ${props => props.theme.displayFontFamily};
      color: ${props => props.theme.white};
      font-weight: 100;

      a {
        color: inherit;
        padding-right: ${34 + 20}px;
        position: relative;

        span.line {
          display: inline-block;
          height: 2px;
          width: 34px;
          background-color: ${props => props.theme.white};
          position: absolute;
          right: 0;
          top: calc(50% - 1px);
          transform: translateY(0);
          transition: transform 0.4s ease-out;
        }
      }
    }
  }
`;

export default class SideNavigation extends Component {
  static propTypes = {
    animateTo: PropTypes.array
  };

  animate = e => {
    e.preventDefault();
    const lines = Array.from(this.menuItems.querySelectorAll('span.line'));
    const menuItemsPosition = lines.map(line => {
      return line.getBoundingClientRect().y;
    });

    const animateToPositions = [];
    let delay = 0;
    for (let i = 0; i < menuItemsPosition.length; i++) {
      lines[i].style = `transform: translateY(-${menuItemsPosition[i] -
        this.props.animateTo[i]}px); transition-delay: ${delay}s`;
      delay += 0.1;
    }

    console.dir(menuItemsPosition);
    console.dir(this.props.animateTo);
    console.dir(animateToPositions);
  };

  render() {
    return (
      <StyledSideNavigation>
        <ul
          ref={c => {
            this.menuItems = c;
          }}
        >
          <li>
            <Link onClick={this.animate} to="/">
              Projects
              <span className="line" />
            </Link>
          </li>
          <li>
            <Link to="/">
              Blog
              <span className="line" />
            </Link>
          </li>
          <li>
            <Link to="/">
              Workshop
              <span className="line" />
            </Link>
          </li>
          <li>
            <Link to="/">
              Contact
              <span className="line" />
            </Link>
          </li>
        </ul>
      </StyledSideNavigation>
    );
  }
}
