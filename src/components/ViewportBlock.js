import React from 'react';
import handleViewport from 'react-in-viewport';
import MagicContentReveal from './MagicContentReveal';

const ViewportBlockWrapper = ({
  className,
  innerRef,
  children,
  enterCount,
}) => (
  <div ref={innerRef}>
    <MagicContentReveal className={className} show={enterCount > 0}>
      {children}
    </MagicContentReveal>
  </div>
);

const ViewportBlock = handleViewport(
  ViewportBlockWrapper,
  {
    threshold: 0,
    rootMargin: '-33.3333%',
  },
  { disconnectOnLeave: true }
);

export default ViewportBlock;
