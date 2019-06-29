import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import ProjectQuickInfo from '../components/ProjectQuickInfo';
import PageContainer from '../components/PageContainer';

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
          <ProjectQuickInfo title="Project" content={title} />
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
      <PageContainer vAlign="flex-start">
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
      </PageContainer>
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
