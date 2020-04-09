import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
// import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import ProjectQuickInfo from '../components/ProjectQuickInfo';
import StyledPageContainer from '../styles/StyledPageContainer';
import ProjectTextBlock from '../components/ProjectTextBlock';
import ProjectImageCaptionBlock from '../components/ProjectImageCaptionBlock';
import SmoothScrollContainer from '../components/SmoothScrollContainer';
import { processContent } from '../lib/content-functions';

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  .projectInfo + .projectInfo {
    margin-top: 78px;

    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  }
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
  }
`;

const ProjectTop = styled.section`
  height: ${({ theme }) => theme.fullHeight};
  align-items: center;
  display: flex;
  height: auto;
  padding-top: 70px;

  .columns {
    padding: 20px;
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
    <div>
      <ProjectTop className="container">
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
      </ProjectTop>
      {processContent(content)}
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
      <SmoothScrollContainer>
        <StyledPageContainer vAlign="flex-start" display="block">
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
          <ProjectTextBlock title="Introduction">
            <p>
              <strong>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </strong>
            </p>
            <p>
              Nunc montes porttitor quam nunc at ullamcorper penatibus cubilia
              ridiculus tortor suscipit. Gravida purus sollicitudin class
              pharetra egestas dis senectus ullamcorper penatibus aptent dictum
              odio. Ut morbi eget condimentum varius volutpat porta euismod
              sociosqu. Venenatis per quis erat cum pellentesque aliquam sem
              rutrum platea malesuada risus parturient. Nulla consectetur
              feugiat fringilla mauris vitae, placerat curabitur integer eu
              praesent. Platea semper porttitor magna nostra ornare vulputate
              elementum elementum quis tincidunt laoreet. Sagittis, lobortis
              posuere varius mus odio. Venenatis gravida, mi ut. Diam taciti,
              nibh nisi. Magnis proin at condimentum, sollicitudin platea
              natoque. Porttitor a aliquet blandit.
            </p>
            <p>
              Quisque aenean taciti semper dolor varius morbi elementum
              suspendisse odio tempus nec sociosqu. Nibh tempus molestie dapibus
              per tellus velit pharetra senectus. Etiam integer cras nec. Nec
              malesuada, imperdiet magna volutpat himenaeos aliquet ultrices
              lectus tristique ullamcorper aptent. Phasellus purus dui gravida
              per; dolor himenaeos tempus lectus erat! Mauris semper velit
              egestas fusce nam leo pharetra per turpis nascetur. At sed.
            </p>
          </ProjectTextBlock>
          <ProjectImageCaptionBlock>
            <p>
              Quisque aenean taciti semper dolor varius morbi elementum
              suspendisse odio tempus nec sociosqu. Nibh tempus molestie dapibus
              per tellus velit pharetra senectus. Etiam integer cras nec. Nec
              malesuada, imperdiet magna volutpat himenaeos aliquet ultrices
              lectus tristique ullamcorper aptent. Phasellus purus dui gravida
              per; dolor himenaeos tempus lectus erat! Mauris semper velit
              egestas fusce nam leo pharetra per turpis nascetur. At sed.
            </p>
          </ProjectImageCaptionBlock>
        </StyledPageContainer>
      </SmoothScrollContainer>
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
