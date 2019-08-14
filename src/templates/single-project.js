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

export const BlogPostTemplate = ({
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
          <div className="image-container">
            <img src={thumbnail} alt="" />
          </div>
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

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <StyledPageContainer vAlign="flex-start">
        <BlogPostTemplate
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
      </StyledPageContainer>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

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
