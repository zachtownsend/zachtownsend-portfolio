import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import posed from 'react-pose';

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
          /* transform: translateY(0);
          transition: transform 0.4s ease-out; */
        }
      }
    }
  }
`;

const Line = posed.span({
  enter: {
    y: 0,
    transition: {
      duration: 1000,
      ease: 'easeInOut'
    },
  },
  exit: {
    y: ({ y }) => y,
    transition: {
      duration: 1000,
      ease: 'easeInOut'
    },
  },
  props: {
    y: 0,
  }
});

export default class SideNavigation extends Component {
  state = {
    yPositions: [0, 0, 0, 0],
  };

  static propTypes = {
    animateTo: PropTypes.arrayOf(PropTypes.number),
    isVisible: PropTypes.bool
  };

  static defaultProps = {
    isVisible: true,
    animateTo: [0, 0, 0, 0],
  };

  componentDidMount = () => {
    this.setYPositions();

    window.addEventListener('resize', this.setYPositions);
  };

  setYPositions = () => {
    const { animateTo } = this.props;
    const lines = Array.from(this.menuItems.querySelectorAll('span.line'));
    const menuItemsPosition = lines.map(line => {
      return line.getBoundingClientRect().y;
    });

    const animateToPositions = [0, 0, 0, 0];
    for (let i = 0; i < menuItemsPosition.length; i++) {
      animateToPositions[i] = -Math.abs(menuItemsPosition[i] - animateTo[i]);
    }
    console.dir({ menuItemsPosition, animateTo });

    this.setState({
      ...this.state,
      yPositions: animateToPositions
    });
  };

  render() {
    const { isVisible } = this.props;
    const { yPositions } = this.state;

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
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[0]}
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              Blog
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[1]}
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              Workshop
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[2]}
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              Contact
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[3]}
              />
            </Link>
          </li>
        </ul>
      </StyledSideNavigation>
    );
  }
}
