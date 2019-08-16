import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Parallax } from 'react-scroll-parallax';
import { getColumnWidth } from '../lib/helpers';

const BlockContainer = styled.figure`
  position: relative;
  width: ${getColumnWidth(10)};
  margin-left: ${getColumnWidth(1)};
  text-align: left;
  padding-bottom: 10%;

  img {
    width: 100%;
  }
`;

const ProjectImageCaptionBlock = ({ children }) => (
  <BlockContainer>
    <img
      src="https://images.unsplash.com/photo-1553013476-72259f63abd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
      alt=""
    />
    {children && (
      <Parallax
        y={[-80, 0]}
        tagOuter="figcaption"
        styleOuter={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
        styleInner={{
          position: 'absolute',
          width: getColumnWidth(3),
          right: getColumnWidth(2),
          bottom: '10%',
          background: '#000',
          padding: '56px 59px 42px',
        }}
      >
        {children}
      </Parallax>
    )}
  </BlockContainer>
);

ProjectImageCaptionBlock.propTypes = {};

export default ProjectImageCaptionBlock;
