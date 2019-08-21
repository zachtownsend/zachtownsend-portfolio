import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default class SmoothScrollContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType(PropTypes.node, PropTypes.element),
  };

  constructor(props) {
    super(props);
    this.scrollable = null;
    this.body = document.body;

    this.state = {
      winSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      docScroll: window.pageYOffset || document.documentElement.scrollTop,
      translationY: {
        previous: 0,
        current: 0,
      },
    };
  }

  componentDidMount() {
    const { calcWinSize, setSize, handleScroll, scrollable } = this;
    const { docScroll } = this.state;

    this.setState({
      translationY: {
        previous: docScroll,
        current: docScroll,
      },
    });

    setSize();

    window.addEventListener('resize', () => {
      calcWinSize();
      setSize();
    });
    window.addEventListener('scroll', handleScroll);
  }

  setSize = () => {
    const { body, scrollable } = this;

    body.style.height = `${scrollable.scrollHeight}px`;
  };

  handleScroll = () => {
    const { docScroll } = this.state;
    const current = window.pageYOffset || document.documentElement.scrollTop;
    const previous = docScroll;
    this.setState({
      docScroll: current,
      translationY: {
        previous: MathUtils.lerp(previous, current, 0.2),
        current,
      },
    });
  };

  calcWinSize = () => {
    this.setState({
      winSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  render() {
    const { children } = this.props;
    const { translationY } = this.state;

    return (
      <Container>
        <div
          ref={c => (this.scrollable = c)}
          style={{
            transform: `translate3d(0,${-1 * translationY.previous}px, 0)`,
          }}
        >
          {children}
        </div>
      </Container>
    );
  }
}
