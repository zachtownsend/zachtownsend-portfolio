import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionLink from 'gatsby-plugin-transition-link';
import TweenMax from 'gsap/umd/TweenMax';

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
    onBeforeTransition: PropTypes.func,
    onAfterTransition: PropTypes.func,
  };

  static defaultProps = {
    open: true,
    animateTo: [0, 0, 0, 0],
    onBeforeTransition: () => false,
    onAfterTransition: () => false,
  };

  constructor(props) {
    super(props);

    this.state = {
      transitioning: false,
    };

    this.menu = null;
    this.menuTitles = [];
    this.menuLines = [];
  }

  componentDidMount = () => {
    requestAnimationFrame(() => {
      this.linePositions();
    });

    window.addEventListener('resize', this.linePositions);
  };

  componentDidUpdate = prevProps => {
    const { open, onBeforeTransition, onAfterTransition } = this.props;
    // const { transitioning } = this.state;
    if (prevProps.open === open) {
      return false;
    }

    onBeforeTransition();

    if (open) {
      this.animateIn(onAfterTransition);
    } else {
      this.animateOut(onAfterTransition);
    }
  };

  /**
   * Set the positions of the destination span lines in the state
   */
  linePositions = () => {
    /**
     * Check that the menuItems refs are available
     */
    if (!this.menu && !this.menuLines && !this.menuTitles) return;

    const { animateTo } = this.props;
    const menuItemsPosition = this.menuLines.map(
      line => line.getBoundingClientRect().y
    );

    const linePositions = [0, 0, 0, 0];

    for (let i = 0; i < menuItemsPosition.length; i += 1) {
      linePositions[i] = -Math.abs(menuItemsPosition[i] - animateTo[i]);
    }

    return linePositions;
  };

  animateIn = onComplete => {
    const { menuLines, menuTitles } = this;

    TweenMax.staggerTo(
      menuLines,
      0.4,
      { cycle: { y: [0, 0, 0, 0] } },
      -0.1,
      onComplete
    );
    TweenMax.staggerTo(menuTitles, 0.4, { y: 0, alpha: 1 }, -0.1);
  };

  animateOut = onComplete => {
    const { menuLines, menuTitles } = this;

    TweenMax.staggerTo(
      menuLines,
      0.4,
      { cycle: { y: this.linePositions() } },
      0.1,
      onComplete
    );

    TweenMax.staggerTo(menuTitles, 0.4, { y: -50, alpha: 0 }, 0.1);
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
