import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionLink from 'gatsby-plugin-transition-link';
import TweenMax from 'gsap/umd/TweenMax';

function animateIn(yPositions, menuLines, menuTitles) {
  TweenMax.staggerTo(menuLines, 0.4, { cycle: { y: [0, 0, 0, 0] } }, -0.1);
  TweenMax.staggerTo(menuTitles, 0.4, { y: 0, alpha: 1 }, -0.1);
}

function animateOut(yPositions, menuLines, menuTitles) {
  TweenMax.staggerTo(menuLines, 0.4, { cycle: { y: yPositions } }, 0.1);
  TweenMax.staggerTo(menuTitles, 0.4, { y: -50, alpha: 0 }, 0.1);
}

const transitionProps = {
  exit: {
    trigger: ({ e }) => {},
  },
  entry: {},
};

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

export default class SideNav extends Component {
  static propTypes = {
    open: PropTypes.bool,
    animateTo: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    isVisible: true,
    animateTo: [0, 0, 0, 0],
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuTitles = [];
    this.menuLines = [];
  }

  componentDidMount = () => {
    requestAnimationFrame(() => {
      this.setLinePositions();
    });

    window.addEventListener('resize', this.setLinePositions);
  };

  componentDidUpdate = prevProps => {
    const { open } = this.props;
    console.log(this.setLinePositions());
    if (open) {
      animateIn([0, 0, 0, 0], this.menuLines, this.menuTitles);
    } else {
      animateOut(this.setLinePositions(), this.menuLines, this.menuTitles);
    }
  };

  /**
   * Set the positions of the destination span lines in the state
   */
  setLinePositions = () => {
    /**
     * Check that the menuItems refs are available
     */
    if (!this.menu && !this.menuLines && !this.menuTitles) return;

    const { animateTo } = this.props;
    const menuItemsPosition = this.menuLines.map(
      line => line.getBoundingClientRect().y
    );

    console.log({ animateTo, menuItemsPosition });

    const animateToPositions = [0, 0, 0, 0];

    for (let i = 0; i < menuItemsPosition.length; i += 1) {
      animateToPositions[i] = -Math.abs(menuItemsPosition[i] - animateTo[i]);
    }

    return animateToPositions;
  };

  render() {
    return (
      <StyledSideNavigation>
        <ul
          ref={c => {
            this.menu = c;
          }}
        >
          <li>
            <TransitionLink to="/projects" {...transitionProps}>
              <span
                className="text-wrapper"
                ref={c => (this.menuTitles[0] = c)}
              >
                Projects
              </span>
              <span className="line" ref={c => (this.menuLines[0] = c)} />
            </TransitionLink>
          </li>
          <li>
            <TransitionLink to="/blog" {...transitionProps}>
              <span
                className="text-wrapper"
                ref={c => (this.menuTitles[1] = c)}
              >
                Blog
              </span>
              <span className="line" ref={c => (this.menuLines[1] = c)} />
            </TransitionLink>
          </li>
          <li>
            <TransitionLink to="/workshop" {...transitionProps}>
              <span
                className="text-wrapper"
                ref={c => (this.menuTitles[2] = c)}
              >
                Workshop
              </span>
              <span className="line" ref={c => (this.menuLines[2] = c)} />
            </TransitionLink>
          </li>
          <li>
            <TransitionLink to="/contact" {...transitionProps}>
              <span
                className="text-wrapper"
                ref={c => (this.menuTitles[3] = c)}
              >
                Contact
              </span>
              <span className="line" ref={c => (this.menuLines[3] = c)} />
            </TransitionLink>
          </li>
        </ul>
      </StyledSideNavigation>
    );
  }
}
