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

        span {
          display: inline-block;

          &.line {
            height: 2px;
            width: 34px;
            background-color: ${props => props.theme.white};
            position: absolute;
            right: 0;
            top: calc(50% - 1px);
          }
        }
      }
    }
  }
`;

const Line = posed.span({
  enter: {
    y: 0,
    transition: {
      duration: 400,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: ({ y }) => y,
    transition: {
      duration: 400,
      ease: 'easeInOut',
    },
  },
  props: {
    y: 0,
    duration: 400,
  },
});

const FadeOutText = posed.span({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 400,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 400,
      ease: 'easeInOut',
      delay: ({ delay }) => 0.1 * delay,
    },
    props: {
      delay: 0,
    },
  },
});

export default class SideNavigation extends Component {
  state = {
    yPositions: [0, 0, 0, 0],
  };

  static propTypes = {
    animateTo: PropTypes.arrayOf(PropTypes.number),
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    isVisible: true,
    animateTo: [0, 0, 0, 0],
  };

  componentDidMount = () => {
    requestAnimationFrame(() => {
      this.setYPositions();
    });

    window.addEventListener('resize', this.setYPositions);
  };

  /**
   * Set the positions of the destination span lines in the state
   */
  setYPositions = () => {
    /**
     * Check that the menuItems refs are available
     */
    if (this.menuItems === null) return;

    const { animateTo } = this.props;
    const lines = Array.from(this.menuItems.querySelectorAll('span.line'));
    const menuItemsPosition = lines.map(line => line.getBoundingClientRect().y);

    const animateToPositions = [0, 0, 0, 0];
    for (let i = 0; i < menuItemsPosition.length; i + 1) {
      animateToPositions[i] = -Math.abs(menuItemsPosition[i] - animateTo[i]);
    }
    console.dir({ menuItemsPosition, animateTo });

    this.setState({
      yPositions: animateToPositions,
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
              <FadeOutText pose={isVisible ? 'enter' : 'exit'} delay={0}>
                Projects
              </FadeOutText>
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[0]}
                duration={400}
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FadeOutText pose={isVisible ? 'enter' : 'exit'} delay={1}>
                Blog
              </FadeOutText>
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[1]}
                duration={400}
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FadeOutText pose={isVisible ? 'enter' : 'exit'} delay={2}>
                Workshop
              </FadeOutText>
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[2]}
                duration={400}
              />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FadeOutText pose={isVisible ? 'enter' : 'exit'} delay={3}>
                Contact
              </FadeOutText>
              <Line
                className="line"
                pose={isVisible ? 'enter' : 'exit'}
                y={yPositions[3]}
                duration={400}
              />
            </Link>
          </li>
        </ul>
      </StyledSideNavigation>
    );
  }
}
