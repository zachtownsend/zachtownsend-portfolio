import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import ProjectQuickInfo from '../components/ProjectQuickInfo';
import StyledPageContainer from '../styles/StyledPageContainer';

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  .projectInfo + .projectInfo {
    margin-top: 78px;
  }
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
  }
`;

export const SingleProjectTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  thumbnail,
}) => {
  const PostContent = contentComponent || Content;
  return (
    <div className="container content">
      <div className="columns">
        <div className="column is-5 is-offset-1">
          <ImageContainer className="image-container">
            <img src={thumbnail} alt="" />
          </ImageContainer>
        </div>
        <div className="column is-3 is-offset-1">
          <ProjectInfoContainer>
            <ProjectQuickInfo title="Project" content={title} />
            <ProjectQuickInfo title="Agency" content="Verb Brands Ltd" />
            <ProjectQuickInfo
              title="Technology"
              content="Wordpress, Woocommerce, PHP, jQuery"
            />
          </ProjectInfoContainer>
        </div>
      </div>
    </div>
  );
};

SingleProjectTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ProjectPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <StyledPageContainer vAlign="flex-start">
        <SingleProjectTemplate
          content={post.html}
          contentComponent={HTMLContent}
          description={post.frontmatter.description}
          helmet={
            <Helmet titleTemplate="%s | Blog">
              <title>{`${post.frontmatter.title}`}</title>
              <meta
                name="description"
                content={`${post.frontmatter.description}`}
              />
            </Helmet>
          }
          tags={post.frontmatter.tags}
          title={post.frontmatter.title}
          thumbnail={post.frontmatter.thumbnail.childImageSharp.resize.src}
        />
        <div className="content container">
          <section className="introduction">
            <header>
              <h2>Introduction</h2>
            </header>
            <article>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </article>
          </section>
        </div>
      </StyledPageContainer>
    </Layout>
  );
};

ProjectPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ProjectPost;

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        thumbnail {
          childImageSharp {
            resize(height: 900) {
              src
            }
          }
        }
        client
        techs
      }
    }
  }
`;
