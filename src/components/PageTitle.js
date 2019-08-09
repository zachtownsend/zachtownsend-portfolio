import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ShuffleText from 'react-shuffle-text';

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

function PageTitle({ display, pageTitle, siteTitle, className }) {
  if (!pageTitle && !siteTitle) return null;

  return (
    <header className={className} data-testid="page-title">
      <StyledPageTitle data-testid="htag">
        {siteTitle && <span className="site-title">{siteTitle}</span>}
        {pageTitle && (
          <span className="page-title">
            <ShuffleText content={pageTitle} />
          </span>
        )}
      </StyledPageTitle>
    </header>
  );
}

PageTitle.propTypes = {
  siteTitle: PropTypes.string,
  pageTitle: PropTypes.string,
  className: PropTypes.string,
};

PageTitle.defaultProps = {
  siteTitle: '',
  pageTitle: '',
  className: null,
};

export default PageTitle;
