import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed from 'react-pose';

const ChildWrapper = styled.span`
  overflow: hidden;
  display: block;
  position: relative;

  span {
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

const Transition = posed.div({
  init: {
    y: 0,
    transition: {
      duration: 0,
    },
  },
  up: {
    y: '-100%',
  },
  down: {
    y: '100%',
  },
});

function PeepholeText({
  tag,
  children,
  nextContent,
  direction,
  nowrap,
  duration,
  onTransitionComplete,
}) {
  const Tag = tag;

  return (
    <Tag>
      <ChildWrapper nowrap={nowrap}>
        <Transition
          pose={nextContent ? direction : 'init'}
          duration={duration}
          onPoseComplete={onTransitionComplete}
        >
          {nextContent && direction === 'down' && (
            <span className="before">{nextContent}</span>
          )}

          <span className="current">{children}</span>

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
  duration: PropTypes.number,
  onTransitionComplete: PropTypes.func,
};

PeepholeText.defaultProps = {
  children: 'Try me',
  tag: 'div',
  nextContent: null,
  direction: 'up',
  nowrap: false,
  duration: 300,
  onTransitionComplete: null,
};

export default PeepholeText;
