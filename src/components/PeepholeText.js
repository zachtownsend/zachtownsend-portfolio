import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

function getNextWidth(
  direction,
  { widthSetter,  dynamicWidth,  callback }
) {
  if (dynamicWidth && widthSetter.current !== undefined) {
    const { current } = widthSetter;
    const sibling =
      current[direction === 'up' ? 'nextSibling' : 'previousSibling'];

    if (sibling && sibling.offsetWidth) {
      if (typeof callback === 'function') {
        callback(sibling.offsetWidth, widthSetter);
      }

      return sibling.offsetWidth;
    }
  }

  return false;
}

const ChildWrapper = styled.span`
  overflow: hidden;
  display: block;
  position: relative;

  span {
    display: inline-block;
  }

  span > span {
    display: block;
    position: absolute;
    ${({ nowrap }) => nowrap && `white-space: nowrap;`}

    &.after {
      top: 100%;
    }

    &.before {
      bottom: 100%;
    }

    &.current {
      position: relative;
    }
  }
`;

const Transition = posed.span({
  init: {
    y: 0,
    transition: {
      duration: 0,
    },
  },
  up: {
    y: '-100%',
    width: props => getNextWidth('up', props) || '100%',
  },
  down: {
    y: '100%',
    width: props => getNextWidth('down', props) || '100%',
  },
});

function PeepholeText({
  tag,
  children,
  nextContent,
  direction,
  nowrap,
  dynamicWidth,
  duration,
  onTransitionComplete,
  className,
}) {
  const Tag = tag;
  const widthSetter = useRef(null);

  return (
    <Tag className={className}>
      <ChildWrapper nowrap={nowrap}>
        <Transition
          pose={nextContent ? direction : 'init'}
          duration={duration}
          onPoseComplete={onTransitionComplete}
          widthSetter={widthSetter}
          dynamicWidth={dynamicWidth}
        >
          {nextContent && direction === 'down' && (
            <span className="before">{nextContent}</span>
          )}

          <span ref={widthSetter} className="current">
            {children}
          </span>

          {nextContent && direction === 'up' && (
            <span className="after">{nextContent}</span>
          )}
        </Transition>
      </ChildWrapper>
    </Tag>
  );
}

PeepholeText.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string,
  nextContent: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']),
  nowrap: PropTypes.bool,
  dynamicWidth: PropTypes.bool,
  duration: PropTypes.number,
  onTransitionComplete: PropTypes.func,
  className: PropTypes.string,
};

PeepholeText.defaultProps = {
  tag: 'div',
  nextContent: null,
  direction: 'up',
  nowrap: false,
  dynamicWidth: false,
  duration: 300,
  onTransitionComplete: null,
};

export default PeepholeText;
