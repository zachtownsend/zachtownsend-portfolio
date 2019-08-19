import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TimelineMax } from 'gsap/umd/TweenMax';

const MagicContainer = styled.div`
  position: relative;
  overflow: hidden;

  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ maskColor }) => maskColor || 'red'};
    z-index: 1;
  }
`;

export default class MagicContentReveal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    maskColor: PropTypes.string,
    speed: PropTypes.number,
    ease: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  };

  static defaultProps = {
    show: false,
    maskColor: 'red',
    speed: 1,
    ease: Power4.easeInOut,
  };

  constructor(props) {
    super(props);
    this.container = null;
    this.mask = null;
    this.timeline = new TimelineMax();
  }

  componentDidMount() {
    const { timeline, container, mask } = this;
    const { speed, ease } = this.props;
    const clipPath = {
      from: 'polygon(0% 0%, 100% 0%, 100% 1px, 0% 1px)',
      to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    };
    const clip = {
      from: 'rect(0 0 0 0)',
      to: 'rect(0 0 0 0)',
    };
    timeline.fromTo(
      container,
      0.6 * speed,
      { width: 0 },
      { width: '100%', ease }
    );
    timeline.fromTo(
      container,
      0.6 * speed,
      {
        clipPath: clipPath.from,
        webkitClipPath: clipPath.from,
        clip: clip.from,
      },
      {
        clipPath: clipPath.to,
        webkitClipPath: clipPath.to,
        clip: clip.to,
        ease,
      }
    );
    timeline.fromTo(
      mask,
      0.6 * speed,
      { height: '100%' },
      { height: '0%', ease, delay: -0.2 * speed }
    );
  }

  componentDidUpdate = prevProps => {
    const { timeline } = this;
    const { show, speed } = this.props;
    if (prevProps.show !== show) {
      if (show) {
        timeline.timeScale(speed).play();
      } else {
        timeline.timeScale(speed).reverse();
      }
    }
  };

  render() {
    const { children, maskColor } = this.props;

    return (
      <MagicContainer ref={c => (this.container = c)} maskColor={maskColor}>
        <div className="mask" ref={c => (this.mask = c)} />
        <div className="clip-wrapper">{children}</div>
      </MagicContainer>
    );
  }
}
