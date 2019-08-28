import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
// import { Parallax } from 'react-scroll-parallax';
import { getColumnWidth } from '../lib/helpers';
import ViewportBlock, { customViewportBlock } from './ViewportBlock';
import { SmoothSrcollConsumer } from './SmoothScrollContainer';

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

const ProjectImageCaptionBlock = ({ children, onLoad, image }) => (
  <BlockContainer>
    <ViewportBlock>
      <SmoothSrcollConsumer>
        {props => <img src={image} alt="" onLoad={props.onLoad} />}
      </SmoothSrcollConsumer>
    </ViewportBlock>
    {children && <FigCaption tag="figcaption">{children}</FigCaption>}
  </BlockContainer>
);

ProjectImageCaptionBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  onLoad: PropTypes.func,
};

export default ProjectImageCaptionBlock;
