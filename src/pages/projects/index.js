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

class ProjectIndexPage extends React.Component {
  state = {
    currentIndex: 0,
    previousIndex: null,
    transitioning: false,
    containerDimensions: { width: 0, height: 0 },
    projectIsWiderThanWindow: false,
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.infoContainer = null;
    this.projectImage = React.createRef();
  }

  updateSlider = swiper => {
    const { y, x, width, height } = swiper.slides[
      swiper.activeIndex
    ].getBoundingClientRect();

    this.setState({
      previousIndex: null,
      transitioning: false,
      containerDimensions: {
        width:
          window.innerWidth - 168 < width ? window.innerWidth - 168 : width,
        height,
        x,
        y,
      },
      projectIsWiderThanWindow: window.innerWidth - 168 < width,
    });
  };

  projectTransition = entryImageBox => {
    const { currentIndex } = this.state;
    const exitImage = this.projectImage.current;
    const exitImageBox = exitImage.getBoundingClientRect();
    const toPositions = {
      x: entryImageBox.x - exitImageBox.x,
      y: entryImageBox.y - exitImageBox.y,
      scale: entryImageBox.width / exitImageBox.width,
    };

    const projects = Array.from(
      exitImage
        .closest('.swiper-wrapper')
        .querySelectorAll('.project-container')
    );

    TweenMax.to(exitImage, 1, {
      x: toPositions.x,
      y: toPositions.y,
      scale: toPositions.scale,
      ease: Power2.easeInOut,
    });

    projects.forEach((project, index) => {
      if (index < currentIndex) {
        TweenMax.to(project, 1, { x: '-25vw', alpha: 0 });
      } else if (index > currentIndex) {
        TweenMax.to(project, 1, { x: '25vw', alpha: 0 });
      }
    });
  };

  projectInfoPosition() {
    const { containerDimensions, projectIsWiderThanWindow } = this.state;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    return {
      bottom:
        windowHeight -
        (containerDimensions.y + containerDimensions.height) +
        24,
      left: projectIsWiderThanWindow ? 40 : containerDimensions.x - 48,
    };
  }

  render() {
    const { currentIndex, previousIndex, transitioning } = this.state;

    const { bottom, left } = this.projectInfoPosition();

    const { edges } = this.props.data.allMarkdownRemark;

    return (
      <Layout>
        <PageHead pageTitle="Projects">
          <meta
            name="description"
            content="This is a description for the projects page"
          />
        </PageHead>
        <StyledPageContainer>
          <ProjectSlider projects={edges} />
        </StyledPageContainer>
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
