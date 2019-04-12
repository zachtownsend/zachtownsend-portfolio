import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Swiper from 'swiper';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
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
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  z-index: 1;
  padding: 0 7%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  color: ${({ theme }) => theme.white};

  header {
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: left;

    h2 {
      font-size: 64px;
    }

    p.client {
      font-family: ${({ theme }) => theme.displayFontFamily};
      font-size: 36px;
      font-weight: 100;
      color: ${({ theme }) => theme.white};
    }
  }

  aside.project-details {
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: left;
  }

  .cta {
    grid-column-start: 2;
    grid-column-end: 3;
  }
`;

class ProjectIndexPage extends React.Component {
  componentDidMount = () => {
    const mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: '10%',
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
                <h2>Hanro</h2>
                <p className="client">Verb Brands Ltd</p>
              </header>
              <aside className="project-details">
                <h3>eCommerce</h3>
                <p>Wordpress, Woocommerce, PHP</p>
              </aside>
              <div className="cta">
                <Button>
                  <a href="#">Explore</a>
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
