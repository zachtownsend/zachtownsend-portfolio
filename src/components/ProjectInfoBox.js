import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const ProjectInfo = styled.div `
  position: fixed;
  left: 0;
  z-index: 1;
  padding: 48px 64px;
  display: block;
  background-color: rgba(0, 0, 0, 0.9);
  color: ${({ theme }) => theme.white};
  transition: transform 0.4s ease-in-out;

  header {
    text-align: left;

    h2 {
      font-size: 32px;
      line-height: 1;
    }

    p.client {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-size: 18px;
      font-weight: 100;
      color: ${({ theme }) => theme.white};
    }
  }

  hr {
    border: 1px inset ${({ theme }) => theme.primary};
    margin: 13px 0 12px;
  }

  aside.project-details {
    text-align: left;

    h3 {
      font-size: 18px;
    }

    ul.techs {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-weight: 100;
      font-size: 14px;
      color: ${({ theme }) => theme.white};

      &.transitioning {
        white-space: nowrap;
      }

      li {
        display: inline-block;
        margin-right: 10px;

        &::after {
          content: ', ';
        }

        &:last-child::after {
          display: none;
        }
      }
    }
  }

  .cta {
    text-align: left;
    margin-top: 12px;
  }
`;

function ProjectInfoBox(props) {
  return (
    <ProjectInfo>

    </ProjectInfo>
  )
}

ProjectInfoBox.propTypes = {

}

export default ProjectInfoBox

