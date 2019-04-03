import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

  .page-title::before {
    content: '/';
    color: ${props => props.theme.primary};
    display: inline-block;
    margin-right: 10px;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}px) {
    text-align: center;

    .site-title {
      display: inline-block;
    }
  }
`;

function PageTitle({ display, pageTitle, siteTitle, className }) {
  if (!display) return null;

  if (!pageTitle && !siteTitle) return null;

  return (
    <header className={className} data-testid="page-title">
      <StyledPageTitle data-testid="htag">
        {siteTitle && <span className="site-title">{siteTitle}</span>}
        {pageTitle && <span className="page-title">{pageTitle}</span>}
      </StyledPageTitle>
    </header>
  );
}

PageTitle.propTypes = {
  siteTitle: PropTypes.string,
  pageTitle: PropTypes.string,
  display: PropTypes.bool,
  className: PropTypes.string,
};

PageTitle.defaultProps = {
  display: true,
  siteTitle: '',
  pageTitle: '',
  className: null,
};

export default PageTitle;
