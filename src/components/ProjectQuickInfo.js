import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectInfo = styled.div.attrs({ className: 'projectInfo' })`
  && {
    text-align: left;

    p {
      color: ${props => props.theme.white};
      font-family: ${props => props.displayFontFamily};
      font-size: 24px;

      &:not(:last-child) {
        margin-bottom: 0;
      }

      &.projectInfo-title {
        font-weight: 400;
      }

      &.projectInfo-label {
        margin-top: 12px;
        font-weight: 100;
        position: relative;

        &::before {
          content: '';
          width: 100%;
          height: 1px;
          background-color: ${props => props.theme.primary};
          position: absolute;
          top: -5px;
        }
      }
    }
  }
`;

export default function ProjectQuickInfo({ title, content }) {
  return (
    <ProjectInfo>
      <p className="projectInfo-title">{title}</p>
      <p className="projectInfo-label">{content}</p>
    </ProjectInfo>
  );
}

ProjectQuickInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
