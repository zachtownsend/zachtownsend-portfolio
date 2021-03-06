import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Button from '../components/Button';
import ContinueArrow from '../components/ContinueArrow';
import StyledPageContainer from '../styles/StyledPageContainer';
import { applyHighlightTags } from '../lib/format';
// import Features from '../components/Features';
// import BlogRoll from '../components/BlogRoll';

const HomePageContainer = styled(StyledPageContainer)`
  background: url(${props => props.backgroundimage});
  background-size: cover;
  background-position: center;
`;

const StyledSiteTitle = styled.header`
  display: flex;
  justify-content: center;

  .page-title {
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
      display: inline-block;
      max-width: 12em;
      margin-bottom: 27px;

      .highlighted {
        color: ${props => props.theme.primary};
      }
    }

    @media (min-width: ${props => props.theme.device.tablet}px) {
      h1 {
        font-size: 64px;
      }

      p.subtitle {
        font-size: 36px;
      }
    }

    @media (min-width: ${props => props.theme.device.touch}px) {
      text-align: right;

      .contact-button {
        display: none;
      }
    }
  }
`;

export const IndexPageTemplate = props => (
  <HomePageContainer
    className="section"
    backgroundimage={props.backgroundimage.childImageSharp.original.src}
  >
    <div className="columns is-multiline">
      <div className="column is-full is-one-third-desktop">
        {props.title && (
          <StyledSiteTitle>
            <div className="page-title">
              <h1>{props.title}</h1>
              {props.subtitle && (
                <p
                  className="subtitle"
                  dangerouslySetInnerHTML={{
                    __html: applyHighlightTags(props.subtitle),
                  }}
                />
              )}
              <Button className="contact-button">
                <Link to="/contact">Contact Me</Link>
              </Button>
            </div>
          </StyledSiteTitle>
        )}
      </div>
      <div className="column is-full is-one-third-desktop">
        <ContinueArrow />
      </div>
      <div className="column is-one-third-desktop" />
    </div>
  </HomePageContainer>
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
