import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SmoothScrollContext = createContext({ onLoad: null });
export const SmoothSrcollProvider = SmoothScrollContext.Provider;
export const SmoothSrcollConsumer = SmoothScrollContext.Consumer;

const Container = styled.main`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b,
};

const body = typeof document !== 'undefined' ? document.body : {};

class SmoothScroll {
  constructor(scrollable, ease = 0.1) {
    const { addEventListener } = window;
    this.scrollable = scrollable;
    this.renderedScroll = {
      previous: 0,
      current: 0,
    };
    this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.winSize = { width: window.innerWidth, height: window.innerHeight };
    this.ease = ease;
    addEventListener('resize', this.calculateWinSize.bind(this));
    addEventListener('scroll', this.getPageYScroll.bind(this));
    this.update();
    this.setSize();
    this.requestAnimationFrameId = requestAnimationFrame(
      this.render.bind(this)
    );
  }

  calculateWinSize() {
    this.winSize = { width: window.innerWidth, height: window.innerHeight };
    this.setSize();
  }

  getPageYScroll() {
    this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
  }

  update() {
    // const docScroll = this.renderedScroll.setValue();
    this.renderedScroll.current = this.docScroll;
    this.renderedScroll.previous = this.docScroll;
    this.layout();
  }

  layout() {
    this.scrollable.style.transform = `translate3d(0,${-1 *
      this.renderedScroll.previous}px,0)`;
  }

  setSize() {
    body.style.height = `${this.scrollable.scrollHeight}px`;
  }

  render() {
    this.renderedScroll.current = this.docScroll;
    this.renderedScroll.previous = MathUtils.lerp(
      this.renderedScroll.previous,
      this.renderedScroll.current,
      this.ease
    );
    if (this.renderedScroll.previous < 0.1) {
      this.renderedScroll.previous = 0;
    }

    this.layout();

    this.requestAnimationFrameId = requestAnimationFrame(
      this.render.bind(this)
    );
  }

  destroy() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }
}

export default class SmoothScrollContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType(PropTypes.node, PropTypes.element),
  };

  constructor(props) {
    super(props);
    this.scrollable = null;
    this.scrollClass = null;
  }

  componentDidMount() {
    const { scrollable } = this;
    this.scrollClass = new SmoothScroll(scrollable, 0.05);
  }

  recalcuatePageSize = () => {
    this.scrollClass.setSize();
  };

  render() {
    const { recalcuatePageSize } = this;
    const { children } = this.props;

    return (
      <SmoothSrcollProvider value={{ onLoad: recalcuatePageSize }}>
        <Container>
          <div ref={c => (this.scrollable = c)}>{children}</div>
        </Container>
      </SmoothSrcollProvider>
    );
  }
}
