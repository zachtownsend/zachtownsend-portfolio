import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

export default function ProjectQuickInfo({ title, content }) {
  return (
    <div className="projectInfo">
      <p className="projectInfo-title">{title}</p>
      <p className="projectInfo-label">{content}</p>
    </div>
  );
}

ProjectQuickInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
