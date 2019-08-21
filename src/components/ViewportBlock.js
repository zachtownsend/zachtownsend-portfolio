import React from 'react';
import handleViewport from 'react-in-viewport';
import MagicContentReveal from './MagicContentReveal';

const defaultOptions = {
  threshold: 0,
  rootMargin: '-33.3333%',
};

const defaultConfig = {
  disconnectOnLeave: false,
};

const ViewportBlockWrapper = ({
  className,
  innerRef,
  children,
  enterCount,
  tag,
}) => {
  const Tag = tag || 'div';
  return (
    <Tag ref={innerRef}>
      <MagicContentReveal className={className} show={enterCount > 0}>
        {children}
      </MagicContentReveal>
    </Tag>
  );
};

const ViewportBlock = handleViewport(
  ViewportBlockWrapper,
  Object.assign({}, defaultOptions),
  Object.assign({}, defaultConfig)
);

export function customViewportBlock(customOptions = {}, customConfig = {}) {
  return handleViewport(
    ViewportBlockWrapper,
    Object.assign(defaultOptions, customOptions),
    Object.assign(defaultConfig, customConfig)
  );
}

export default ViewportBlock;
