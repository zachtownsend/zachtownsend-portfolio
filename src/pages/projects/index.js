import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Swiper from 'swiper';
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
`;

const ProjectInfo = styled.div`
  position: absolute;
  top: 48px;
  left: 7%;
  z-index: 1;
  padding: 48px 64px;
  display: block;
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};

  header {
    text-align: left;

    h2 {
      font-size: 64px;
      line-height: 1;
    }

    p.client {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-size: 24px;
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
      font-size: 24px;
    }

    p.techs {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-weight: 100;
      font-size: 18px;
      color: ${({ theme }) => theme.white};
    }
  }

  .cta {
    text-align: left;
    margin-top: 12px;
  }
`;

class ProjectIndexPage extends React.Component {
  state = {
    currentProject: 1,
  };

  componentDidMount = () => {
    const swiper = new Swiper('.swiper-container', {
      initialSlide: 0,
      direction: 'horizontal',
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: '10%',
      on: {
        slideChangeTransitionStart() {
          console.log(this.previousIndex, this.activeIndex);
        },
      },
    });
  };

  render() {
    const { data } = this.props;
    const projects = data.allMarkdownRemark.edges.map(project => (
      <div className="swiper-slide" key={project.node.id}>
        <div className="project-container">
          <img src={project.node.frontmatter.thumbnail.publicURL} alt="" />
        </div>
      </div>
    ));
    return (
      <Layout>
        <StyledPageContainer>
          <StyledSwiper className="swiper-container">
            <div className="swiper-wrapper">{projects}</div>
            <ProjectInfo>
              <header>
                <PeepholeText tag="h2">Hanro</PeepholeText>
                <p className="client">
                  <span>Verb Brands Ltd</span>
                </p>
              </header>
              <hr />
              <aside className="project-details">
                <h3>
                  <span>eCommerce</span>
                </h3>
                <p className="techs">
                  <span>Wordpress, Woocommerce, PHP</span>
                </p>
              </aside>
              <div className="cta">
                <Button>
                  <a href="#">
                    <span>Explore</span>
                  </a>
                </Button>
              </div>
            </ProjectInfo>
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
                  publicURL
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
