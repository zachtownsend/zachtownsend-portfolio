import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChildWrapper = styled.span`
  overflow: hidden;
  display: block;
  position: relative;

  > span {
    display: block;
    position: absolute;

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

function PeepholeText({ tag, children, nextContent, direction }) {
  const Tag = tag;
  return (
    <Tag>
      <ChildWrapper>
        {nextContent && direction === 'down' && (
          <span className="before">{nextContent}</span>
        )}

        <span className="current">{children}</span>

        {nextContent && direction === 'up' && (
          <span className="after">{nextContent}</span>
        )}
      </ChildWrapper>
    </Tag>
  );
}

PeepholeText.propTypes = {
  tag: PropTypes.string,
  nextContent: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']),
};

PeepholeText.defaultProps = {
  tag: 'div',
  nextContent: null,
  direction: 'up',
};

export default PeepholeText;
