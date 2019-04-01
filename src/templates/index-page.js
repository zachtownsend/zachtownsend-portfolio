import React from 'react';
// import PropTypes from 'prop-types';
// import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
// import Features from '../components/Features';
// import BlogRoll from '../components/BlogRoll';

export const IndexPageTemplate = () => (
  <div>
    <h1>Soon this will be something cool</h1>
  </div>
);

IndexPageTemplate.propTypes = {
  backgroundimage: PropTypes.shape({
    childImageSharp: {
      original: {
        width: PropTypes.number,
        height: PropTypes.number,
        src: PropTypes.string,
      },
    },
  }),
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const { backgroundimage, title, subtitle } = frontmatter;

  return (
    <Layout>
      <IndexPageTemplate
      backgroundimage={backgroundimage}
      title={title}
      subtitle={subtitle}
      />
    </Layout>
  );
};

// IndexPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object
//     })
//   })
// };

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitle
        backgroundimage {
          childImageSharp {
            original {
              width
              height
              src
            }
          }
        }
      }
    }
  }
`;
