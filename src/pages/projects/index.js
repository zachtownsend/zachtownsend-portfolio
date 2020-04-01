import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import posed, { PoseGroup } from 'react-pose';
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link';
import classNames from 'classnames';
import TweenMax from 'gsap/umd/TweenMax';
import Layout from '../../components/Layout';
import PageHead from '../../components/PageHead';
import PeepholeText from '../../components/PeepholeText';
import StyledPageContainer from '../../styles/StyledPageContainer';
import ProjectSlider from '../../components/ProjectSlider';
import 'swiper/swiper.scss';

const StyledProjectPageContainer = styled(StyledPageContainer)`
  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 0;
  }
`;
class ProjectIndexPage extends React.Component {
  render() {
    const { edges } = this.props.data.allMarkdownRemark;

    return (
      <Layout>
        <PageHead pageTitle="Projects">
          <meta
            name="description"
            content="This is a description for the projects page"
          />
        </PageHead>
        <StyledProjectPageContainer>
          <ProjectSlider projects={edges} />
        </StyledProjectPageContainer>
      </Layout>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query ProjectsArchive {
        allMarkdownRemark(
          limit: 10
          filter: { frontmatter: { templateKey: { eq: "single-project" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
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
              rawMarkdownBody
            }
          }
        }
        markdownRemark(frontmatter: { templateKey: { eq: "single-project" } }) {
          frontmatter {
            title
          }
        }
      }
    `}
    render={projects => <ProjectIndexPage data={projects} {...props} />}
  />
);
