import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Swiper from 'swiper';
import posed, { PoseGroup } from 'react-pose';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import PeepholeText from '../../components/PeepholeText';
import StyledPageContainer from '../../styles/StyledPageContainer';
import '../../../node_modules/swiper/dist/css/swiper.min.css';

const StyledSwiper = styled.div`
  width: 100%;
  height: 100%;

  .swiper-slide {
    width: auto;

    .project-container {
      img {
        height: 75vh;
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

const ProjectInfo = styled.div`
  position: absolute;
  bottom: 24px;
  left: -48px;
  z-index: 1;
  padding: 48px 64px;
  display: block;
  background-color: rgba(0, 0, 0, 0.9);
  color: ${({ theme }) => theme.white};

  header {
    text-align: left;

    h2 {
      font-size: 32px;
      line-height: 1;
    }

    p.client {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-size: 18px;
      font-weight: 100;
      color: ${({ theme }) => theme.white};
    }
  }

  hr {
    border: 1px inset ${({ theme }) => theme.primary};
    margin: 13px 0 12px;
  }

  aside.project-details {
    text-align: left;

    h3 {
      font-size: 18px;
    }

    ul.techs {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-weight: 100;
      font-size: 14px;
      color: ${({ theme }) => theme.white};

      &.transitioning {
        white-space: nowrap;
      }

      li {
        display: inline-block;
        margin-right: 10px;

        &::after {
          content: ', ';
        }

        &:last-child::after {
          display: none;
        }
      }
    }
  }

  .cta {
    text-align: left;
    margin-top: 12px;
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

    this.infoContainer = null;
  }

  componentDidMount = () => {
    const { setState } = this;
    const swiper = new Swiper('.swiper-container', {
      initialSlide: 0,
      direction: 'horizontal',
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: '10%',
    });
    swiper
      .on('transitionStart', () => {
        this.setState({
          currentIndex: swiper.activeIndex,
          previousIndex: swiper.previousIndex,
          transitioning: true,
        });
      })
      .on('transitionEnd', () => {
        const { width, height } = swiper.slides[
          swiper.activeIndex
        ].getBoundingClientRect();

        this.setState({
          previousIndex: null,
          transitioning: false,
          containerDimensions: {
            width:
              window.innerWidth - 168 < width ? window.innerWidth - 168 : width,
            height,
          },
          projectIsWiderThanWindow: window.innerWidth - 168 < width,
        });
      });
  };

  render() {
    const {
      currentIndex,
      previousIndex,
      transitioning,
      containerDimensions,
      projectIsWiderThanWindow,
    } = this.state;

    const { edges } = this.props.data.allMarkdownRemark;

    const projects = edges.map(project => (
      <div className="swiper-slide" key={project.node.id}>
        <div className="project-container">
          <img
            src={project.node.frontmatter.thumbnail.childImageSharp.resize.src}
            alt=""
          />
        </div>
      </div>
    ));

    return (
      <Layout>
        <StyledPageContainer>
          <StyledSwiper className="swiper-container">
            <div className="swiper-wrapper">{projects}</div>
            <div
              ref={c => (this.infoContainer = c)}
              className="info-container"
              style={{
                width: containerDimensions.width,
                height: containerDimensions.height,
              }}
            >
              <ProjectInfo>
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
                    <a href="#">
                      <span>Explore</span>
                    </a>
                  </Button>
                </div>
              </ProjectInfo>
            </div>
          </StyledSwiper>
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
