import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionLink from 'gatsby-plugin-transition-link';
import TweenMax from 'gsap/umd/TweenMax';
import { getPageTitleFromPath } from '../lib/helpers';

const transitionProps = {
  replace: true,
  // exit: {
  //   // delay: 0,
  //   // length: 0.8,
  //   zIndex: 1,
  // },
  // entry: {
  //   // delay: 0,
  //   // length: 0.8,
  //   zIndex: 0,
  // },
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
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};

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
    visible: PropTypes.bool,
    links: PropTypes.arrayOf(PropTypes.string),
    hamburgerLinePositions: PropTypes.arrayOf(PropTypes.number),
    onBeforeTransition: PropTypes.func,
    onAfterTransition: PropTypes.func,
  };

  static defaultProps = {
    open: true,
    visible: true,
    hamburgerLinePositions: [0, 0, 0, 0],
    onBeforeTransition: () => false,
    onAfterTransition: () => false,
  };

  constructor(props) {
    super(props);

    this.menuTitles = [];
    this.menuLines = [];
  }

  componentDidUpdate = prevProps => {
    const { open, onBeforeTransition, onAfterTransition } = this.props;

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
    if (!this.menuLines && !this.menuTitles) return;

    const { hamburgerLinePositions } = this.props;
    const menuLinePositions = this.menuLines.map(
      line => line.getBoundingClientRect().y
    );

    return menuLinePositions.map(
      (linePosition, index) =>
        -Math.abs(linePosition - hamburgerLinePositions[index])
    );
  };

  animateIn = onComplete => {
    const { menuLines, menuTitles } = this;

    TweenMax.staggerFromTo(
      menuLines,
      0.4,
      { cycle: { y: this.linePositions() } },
      { cycle: { y: [0, 0, 0, 0] } },
      -0.1,
      delay => {
        setTimeout(() => {
          onComplete();
          TweenMax.set(menuLines, { y: [0, 0, 0, 0] });
        }, delay);
      },
      [menuLines.length * 0.1] // To Compensate for the stagger delay
    );
    TweenMax.staggerFromTo(
      menuTitles,
      0.4,
      { y: -50, alpha: 0 },
      { y: 0, alpha: 1 },
      -0.1
    );
  };

  animateOut = onComplete => {
    const { menuLines, menuTitles } = this;

    TweenMax.staggerFromTo(
      menuLines,
      0.4,
      { cycle: { y: [0, 0, 0, 0] } },
      { cycle: { y: this.linePositions() } },
      0.1,
      delay => {
        setTimeout(() => {
          onComplete();
          TweenMax.set(menuLines, { y: [0, 0, 0, 0] });
        }, delay);
      },
      [menuLines.length * 0.1] // To Compensate for the stagger delay
    );

    TweenMax.staggerTo(menuTitles, 0.4, { y: -50, alpha: 0 }, 0.1);
  };

  render() {
    const { visible, links } = this.props;

    return (
      <StyledSideNavigation visible={visible}>
        <ul>
          {links.map((link, index) => (
            <li>
              <TransitionLink to={link} {...transitionProps}>
                <span
                  className="text-wrapper"
                  ref={c => (this.menuTitles[index] = c)}
                >
                  {getPageTitleFromPath(link)}
                </span>
                <span className="line" ref={c => (this.menuLines[index] = c)} />
              </TransitionLink>
            </li>
          ))}
        </ul>
      </StyledSideNavigation>
    );
  }
}
