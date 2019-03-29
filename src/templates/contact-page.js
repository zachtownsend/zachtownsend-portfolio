import React from 'react';
// import PropTypes from 'prop-types';
// import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';

export const ContactPageTemplate = () => <div />;

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ContactPageTemplate />
    </Layout>
  );
};

export default ContactPage;
