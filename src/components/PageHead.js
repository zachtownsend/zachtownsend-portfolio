import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import useSiteMetadata from './SiteMetadata';

function PageHead(props) {
  const { title } = useSiteMetadata();
  const { pageTitle, children } = props;
  return (
    <Helmet>
      <title>
        {title} | {pageTitle}
      </title>
      {children}
    </Helmet>
  );
}

PageHead.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default PageHead;
