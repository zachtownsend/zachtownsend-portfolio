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

function PageTitle(props) {
  if (!props.display) return null;

  if (!props.pageTitle && !props.siteTitle) return null;

  return (
    <header className={props.className} data-testid="page-title">
      <StyledPageTitle data-testid="htag">
        {props.siteTitle && (
          <span className="site-title">{props.siteTitle}</span>
        )}
        {props.pageTitle && (
          <span className="page-title">{props.pageTitle}</span>
        )}
      </StyledPageTitle>
    </header>
  );
}

PageTitle.propTypes = {
  siteTitle: PropTypes.string,
  pageTitle: PropTypes.string,
  display: PropTypes.bool
};

PageTitle.defaultProps = {
  display: true,
  siteTitle: '',
  pageTitle: '',
};

export default PageTitle;
