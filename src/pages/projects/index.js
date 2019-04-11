import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Swiper from 'swiper';
import Layout from '../../components/Layout';
import StyledPageContainer from '../../styles/StyledPageContainer';
import '../../../node_modules/swiper/dist/css/swiper.min.css';

const SwiperContainer = styled.div`
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
          <h2>{project.node.frontmatter.title}</h2>
          <img src={project.node.frontmatter.thumbnail.publicURL} alt="" />
        </div>
      </div>
    ));
    return (
      <Layout>
        <StyledPageContainer>
          <div className="content">
            <SwiperContainer className="swiper-container">
              <div className="swiper-wrapper">{projects}</div>
            </SwiperContainer>
          </div>
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
