import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Parallax } from 'react-scroll-parallax';
import { getColumnWidth } from '../lib/helpers';
import ViewportBlock, { customViewportBlock } from './ViewportBlock';

const BlockContainer = styled.figure`
  position: relative;
  width: ${getColumnWidth(10)};
  margin-left: ${getColumnWidth(1)};
  text-align: left;
  padding-bottom: 10%;

  img {
    width: 100%;
  }

  /* figcaption {
    position: absolute;
    width: ${getColumnWidth(3)};
    right: ${getColumnWidth(2)};
    bottom: 10%;
    background: ${({ theme }) => theme.black};
    padding: 56px 59px 42px;
  } */
`;

const CustomViewportBlock = customViewportBlock({ rootMargin: '50%' });

const FigCaption = styled(CustomViewportBlock)`
  position: absolute;
  width: ${getColumnWidth(3)};
  right: ${getColumnWidth(2)};
  bottom: 10%;
  background: ${({ theme }) => theme.black};
  padding: 56px 59px 42px;
`;

const ProjectImageCaptionBlock = ({ children }) => (
  <BlockContainer>
    <ViewportBlock>
      <img
        src="https://images.unsplash.com/photo-1553013476-72259f63abd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
        alt=""
      />
    </ViewportBlock>
    {children && <FigCaption tag="figcaption">{children}</FigCaption>}
  </BlockContainer>
);

ProjectImageCaptionBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default ProjectImageCaptionBlock;
