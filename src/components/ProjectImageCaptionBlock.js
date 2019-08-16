import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getColumnWidth } from '../lib/helpers';

const BlockContainer = styled.figure`
  position: relative;
  width: ${getColumnWidth(10)};
  margin-left: ${getColumnWidth(1)};
  text-align: left;
  padding-bottom: 10%;

  figcaption {
    position: absolute;
    width: ${getColumnWidth(3)};
    right: ${getColumnWidth(2)};
    bottom: 10%;
    background: ${({ theme }) => theme.black};
    padding: 56px 59px 42px;
  }
`;

const ProjectImageCaptionBlock = ({ children }) => (
  <BlockContainer>
    <img
      src="https://images.unsplash.com/photo-1553013476-72259f63abd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
      alt=""
    />
    {children && <figcaption className="caption-block">{children}</figcaption>}
  </BlockContainer>
);

ProjectImageCaptionBlock.propTypes = {};

export default ProjectImageCaptionBlock;
