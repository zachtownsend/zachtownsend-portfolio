import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import posed, { PoseGroup } from 'react-pose';
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link';
import classNames from 'classnames';
import TweenMax from 'gsap/umd/TweenMax';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import PageHead from '../../components/PageHead';
import PeepholeText from '../../components/PeepholeText';
import StyledPageContainer from '../../styles/StyledPageContainer';
import ProjectSlider from '../../components/ProjectSlider';
import 'swiper/swiper.scss';

const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;

  &.swiper-container {
    overflow: visible;
  }

  .swiper-slide {
    width: auto;

    .project-container {
      line-height: 0;
      height: 75vh;
      transform-origin: top left;

      img {
        height: 100%;
        width: auto;
      }
    }
  }

  .info-container {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.4s ease-in-out;
  }
`;

const Tech = posed.li({
  enter: {
    opacity: 1,
    delay: ({ delay }) => delay,
  },
  exit: {
    opacity: 0,
  },
});

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
          <ProjectInfo
            style={{
              bottom: `${bottom}px`,
              transform: `translateX(${left}px)`,
            }}
          >
            <header>
              <PeepholeText
                tag="h2"
                nowrap
                dynamicWidth
                direction={previousIndex > currentIndex ? 'up' : 'down'}
                nextContent={
                  transitioning
                    ? edges[currentIndex].node.frontmatter.title
                    : null
                }
              >
                {
                  edges[transitioning ? previousIndex : currentIndex].node
                    .frontmatter.title
                }
              </PeepholeText>
              <PeepholeText
                tag="p"
                className="client"
                direction={previousIndex < currentIndex ? 'up' : 'down'}
                nextContent={
                  transitioning
                    ? edges[currentIndex].node.frontmatter.client
                    : null
                }
              >
                {
                  edges[transitioning ? previousIndex : currentIndex].node
                    .frontmatter.client
                }
              </PeepholeText>
            </header>
            <hr />
            <aside className="project-details">
              <h3>
                <span>eCommerce</span>
              </h3>
              <ul
                className={classNames(
                  'techs',
                  transitioning && 'transitioning'
                )}
              >
                <PoseGroup>
                  {edges[currentIndex].node.frontmatter.techs.map(
                    (tech, index) => (
                      <Tech key={tech} delay={index * 50}>
                        {tech}
                      </Tech>
                    )
                  )}
                </PoseGroup>
              </ul>
            </aside>
            <div className="cta">
              <Button>
                <TransitionLink
                  to={edges[currentIndex].node.fields.slug}
                  exit={{
                    trigger: ({ node, e, exit, entry }) => {
                      console.log(
                        node,
                        node.querySelector('.image-container'),
                        e,
                        exit,
                        entry
                      );
                    },
                    length: 1,
                    zIndex: 2,
                  }}
                  entry={{
                    trigger: ({ node }) => {
                      requestAnimationFrame(() => {
                        const image = node.querySelector('.image-container');
                        this.projectTransition(image.getBoundingClientRect());
                      });
                    },
                    delay: 0,
                    length: 1,
                  }}
                >
                  <span>Explore</span>
                </TransitionLink>
              </Button>
            </div>
          </ProjectInfo>
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
