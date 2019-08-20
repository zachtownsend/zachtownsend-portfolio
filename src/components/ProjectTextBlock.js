import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Parallax } from 'react-scroll-parallax';
import { getColumnWidth } from '../lib/helpers';

const TextBlockContainer = styled.div`
  position: relative;
  text-align: left;
`;

const Header = styled.header`
  /* position: absolute; */
  mix-blend-mode: exclusion;
  color: ${({ theme }) => theme.white};
  width: ${getColumnWidth(3)};
  margin-left: ${getColumnWidth(1)};
  margin-top: 82px;

  h2 {
    font-size: 72px;
  }
`;

const Content = styled.div`
  background: ${({ theme }) => theme.white};
  padding: 82px ${getColumnWidth(1, 8)} 86px ${getColumnWidth(2, 8)};
  width: ${getColumnWidth(8)};
  margin-left: ${getColumnWidth(2)};
`;

function ProjectTextBlock({ title, children }) {
  return (
    <TextBlockContainer className="container">
      <Header>
        <h2>{title}</h2>
      </Header>
      <Content>{children}</Content>
    </TextBlockContainer>
  );
}

ProjectTextBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.element),
};

export default ProjectTextBlock;
