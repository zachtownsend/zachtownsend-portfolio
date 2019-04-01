import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Button from '../components/Button';
// import Features from '../components/Features';
// import BlogRoll from '../components/BlogRoll';

const StyledPageContainer = styled.div`
  background: url(${props => props.backgroundimage});
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  /* background: url('/assets/images/desktop-large_home-bg.jpg') no-repeat center center; */
  background-size: cover;
`;

const StyledSiteTitle = styled.header`
  text-align: center;

  h1 {
    font-size: 36px;
    line-height: 1.2;
    color: ${props => props.theme.white};
  }

  p.subtitle {
    color: ${props => props.theme.lightGray};
    font-size: 18px;
    line-height: 1.1667;
    margin-bottom: 27px;

    &.highlight {
      color: ${props => props.theme.primary};
    }
  }
`;

export const IndexPageTemplate = props => (
  <StyledPageContainer className="section" backgroundimage={props.backgroundimage.childImageSharp.original.src}>
    {props.title &&
      <StyledSiteTitle>
        <h1>{props.title}</h1>
        {props.subtitle && <p className="subtitle">{props.subtitle}</p>}
        <Button><Link to="/contact">Contact Me</Link></Button>
      </StyledSiteTitle>
    }
  </StyledPageContainer>
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
