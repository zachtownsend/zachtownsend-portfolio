import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getPageTitleFromPath, getBasePath } from '../lib/helpers';

const StyledPageTitle = styled.h1`
  color: ${props => props.theme.white};
  font-size: 24px;
  line-height: 44px;
  text-align: left;

  .site-title {
    display: none;
    color: ${props => props.theme.lightGray};

    + .page-title {
      margin-left: 10px;
    }
  }

  .page-title {
    color: ${props => props.theme.white};
  }

  .page-title::before {
    content: '/';
    color: ${props => props.theme.primary};
    display: inline-block;
    margin-right: 10px;
  }

  @media (min-width: ${props => props.theme.device.tablet}px) {
    text-align: center;

    .site-title {
      display: inline-block;
    }
  }

  @media (min-width: ${props => props.theme.device.touch}px) {
    text-align: left;
  }

  .shuffle-text-char {
    animation: none; /* none for no effect */
  }
`;

function PageTitle({ path, siteTitle, className }) {
  if (!path && !siteTitle) return null;

  const pageTitle = getPageTitleFromPath(path);

  return (
    <header className={className} data-testid="page-title">
      <StyledPageTitle data-testid="htag">
        {siteTitle && <span className="site-title">{siteTitle}</span>}
        {pageTitle && (
          <a className="page-title" href={getBasePath(path)}>
            {pageTitle}
          </a>
        )}
      </StyledPageTitle>
    </header>
  );
}

PageTitle.propTypes = {
  siteTitle: PropTypes.string,
  path: PropTypes.string,
  className: PropTypes.string,
};

PageTitle.defaultProps = {
  siteTitle: '',
  path: '',
  className: null,
};

export default PageTitle;
