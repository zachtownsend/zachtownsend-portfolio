import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';
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

const Line = posed.span({
  enter: {
    y: 0,
    transition: ({ y }) => ({
      duration: 800,
      ease: 'easeInOut',
      from: y,
    }),
  },
  exit: {
    y: ({ y }) => y,
    transition: {
      duration: 800,
      ease: 'easeInOut',
    },
    onPoseComplete: e => {
      console.log(e.element.getBoundingClientRect());
    },
  },
  props: {
    y: 0,
  },
});

const FadeOutText = posed.span({
  enter: {
    y: 0,
    opacity: 1,
    delay: ({ delay }) => 0.1 * delay,
    transition: {
      duration: 800,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    delay: ({ delay }) => 0.1 * delay,
    transition: {
      duration: 800,
      ease: 'easeInOut',
    },
    props: {
      delay: 0,
    },
  },
});

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
      yPositions: this.state.yPositions || [0, 0, 0, 0],
    };

    this.transitionProps = {
      exit: {
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
  }

  componentDidMount = () => {
    requestAnimationFrame(() => {
      this.setLinePositions();
    });

    window.addEventListener('resize', this.setLinePositions);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.yPositions === this.state.yPositions;
  }

  /**
   * Set the positions of the destination span lines in the state
   */
  setLinePositions = () => {
    /**
     * Check that the menuItems refs are available
     */
    if (!this.menuItems) return;

    const { animateTo } = this.props;
    const lines = Array.from(this.menuItems.querySelectorAll('span.line'));
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
        console.log(this.state.yPositions);
      }
    );

    return animateToPositions;
  };

  render() {
    const { transitionProps } = this;
    const { isVisible, transition } = this.props;
    const { yPositions } = this.state;

    return (
      <StyledSideNavigation>
        <TransitionState exit={{ length: 0.5 }} entry={{ delay: 0.5 }}>
          {({ transitionStatus }) => {
            const transitioning = ['entering', 'entered'].includes(
              transitionStatus
            );
            const shouldTransition =
              this.props.location === '/' &&
              ['entered', 'entering', 'exiting'].includes(transitionStatus);

            return (
              <ul
                ref={c => {
                  this.menuItems = c;
                }}
              >
                <li>
                  <TransitionLink to="/" {...transitionProps}>
                    <FadeOutText pose={transition} delay={0}>
                      Projects
                    </FadeOutText>
                    <Line
                      className="line"
                      pose={transition}
                      y={yPositions[0]}
                      duration={400}
                    />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/" {...transitionProps}>
                    <FadeOutText pose={transition} delay={1}>
                      Blog
                    </FadeOutText>
                    <Line
                      className="line"
                      pose={transition}
                      y={yPositions[1]}
                      duration={400}
                    />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/" {...transitionProps}>
                    <FadeOutText pose={transition} delay={2}>
                      Workshop
                    </FadeOutText>
                    <Line
                      className="line"
                      pose={transition}
                      y={yPositions[2]}
                      duration={400}
                    />
                  </TransitionLink>
                </li>
                <li>
                  <TransitionLink to="/contact" {...transitionProps}>
                    <FadeOutText pose={transition} delay={3}>
                      Contact
                    </FadeOutText>
                    <Line
                      className="line"
                      pose={transition}
                      y={yPositions[3]}
                      duration={400}
                    />
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
