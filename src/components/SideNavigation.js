import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
import { TweenMax } from 'gsap/TweenMax';
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link';

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

export default class SideNavigation extends Component {
  static propTypes = {
    animateTo: PropTypes.arrayOf(PropTypes.number),
    isVisible: PropTypes.bool,
    location: PropTypes.string,
    transition: PropTypes.oneOf(['enter', 'exit']),
  };

  static defaultProps = {
    isVisible: true,
    animateTo: [0, 0, 0, 0],
    location: '/',
    transition: 'enter',
  };

  constructor(props) {
    super(props);
    const { location } = props;
    this.state = {
      yPositions: [0, 0, 0, 0],
    };

    this.transitionProps = {
      exit: {
        trigger: ({ e }) => {
          const { pathname } = e.target.closest('a');
          if (pathname === '/') {
            this.animateIn();
          } else {
            this.animateOut();
          }
          // console.dir(pathname);
        },
        length: 2,
        state: {
          location,
        },
      },
      entry: {
        delay: 0.8,
        state: {
          location,
        },
      },
    };

    this.menu = null;
    this.menuTitles = null;
    this.menuLines = null;
    this.lineTween = null;
    this.titleTween = null;
  }

  componentDidMount = () => {
    requestAnimationFrame(() => {
      this.setLinePositions(() => {
        this.menuTitles = this.menu.querySelectorAll('span.text-wrapper');
        this.menuLines = this.menu.querySelectorAll('span.line');
      });
    });

    window.addEventListener('resize', this.setLinePositions);
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { yPositions } = this.state;
  //   return nextState.yPositions === yPositions;
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setLinePositions);
  }

  animateOut = () => {
    const { yPositions } = this.state;
    TweenMax.staggerTo(this.menuLines, 0.4, { cycle: { y: yPositions } }, 0.1);
    TweenMax.staggerTo(this.menuTitles, 0.4, { y: -50, alpha: 0 }, 0.1);
  };

  animateIn = () => {
    const { yPositions } = this.state;
    TweenMax.staggerFromTo(
      this.menuLines,
      0.4,
      { cycle: { y: yPositions } },
      { cycle: { y: [0, 0, 0, 0] } },
      0.1
    );
    TweenMax.staggerFrom(this.menuTitles, 0.4, { y: -50, alpha: 0 }, 0.1);
  };

  /**
   * Set the positions of the destination span lines in the state
   */
  setLinePositions = callback => {
    /**
     * Check that the menuItems refs are available
     */
    if (!this.menu) return;

    const { animateTo } = this.props;
    const lines = Array.from(this.menu.querySelectorAll('span.line'));
    const menuItemsPosition = lines.map(line => line.getBoundingClientRect().y);

    const animateToPositions = [0, 0, 0, 0];
    for (let i = 0; i < menuItemsPosition.length; i += 1) {
      animateToPositions[i] = -Math.abs(menuItemsPosition[i] - animateTo[i]);
    }

    this.setState(
      {
        yPositions: animateToPositions,
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      }
    );

    return animateToPositions;
  };

  render() {
    const { transitionProps } = this;
    const { location } = this.props;
    const isHomepage = location === '/';

    return (
      <StyledSideNavigation>
        <TransitionState>
          {({ transitionStatus }) => {
            if (
              this.props.location === '/' &&
              ['exiting', 'exited'].includes(transitionStatus) &&
              !TweenMax.isTweening(this.menuLines)
            ) {
              if (this.menuLines !== null) {
                this.animateIn();
              }
            }
            return (
              <ul
                ref={c => {
                  this.menu = c;
                }}
              >
                <li>
                  <TransitionLink to="/" {...transitionProps}>
                    <span className="text-wrapper">Projects</span>
                    <span className="line" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/" {...transitionProps}>
                    <span className="text-wrapper">Blog</span>
                    <span className="line" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/" {...transitionProps}>
                    <span className="text-wrapper">Workshop</span>
                    <span className="line" />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/contact" {...transitionProps}>
                    <span className="text-wrapper">Contact</span>
                    <span className="line" />
                  </TransitionLink>
                </li>
              </ul>
            );
          }}
        </TransitionState>
      </StyledSideNavigation>
    );
  }
}
