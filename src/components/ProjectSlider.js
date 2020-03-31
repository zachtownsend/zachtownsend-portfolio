import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import ProjectInfoBox from './ProjectInfoBox';

const StyledSwiper = styled.div `
  /* width: 100%;
  height: 100%; */

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
function Slide({ project }) {
  return (
    <div className="swiper-slide" key={project.id}>
      <div
        className="project-container"
        // ref={index === currentIndex ? this.projectImage : null}
      >
        <img
          src={project.frontmatter.thumbnail.childImageSharp.resize.src}
          alt=""
        />
      </div>
    </div>
  );
}

function ProjectSlider({ projects }) {
  const [swiper, setSwiper] = useState(null);
  const [swiperState, setSwiperState] = useState({
    currentIndex: 0,
    previousIndex: null,
    transitioning: false,
  });

  const [projectInfoBoxPosition, setProjectInfoBoxPosition] = useState({
    bottom: 0,
    left: 0,
  });

  const params = {
    getSwiper: setSwiper,
    initialSlide: 0,
    direction: 'horizontal',
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: '10%',
    preloadImages: true,
    updateOnImagesReady: true,
    preventClicksPropagation: false,
    autoResize: true,
    init: false,
  };

  useEffect(() => {
    if (swiper !== null && !swiper.initialized) {
      const updateSlider = () => {
        const slide = swiper.slides[swiper.activeIndex];

        if (slide === undefined) {
          return false;
        }

        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

        const { y, x, width, height } = slide.getBoundingClientRect();
        const projectIsWiderThanWindow = window.innerWidth - 168 < width;

        setSwiperState({
          currentIndex: swiper.activeIndex,
          previousIndex: null,
          transitioning: false,
        });

        const newProjectInfoBoxPosition = {
          bottom: windowHeight - (y + height),
          left: projectIsWiderThanWindow ? 40 : x - 48,
        };
        setProjectInfoBoxPosition(newProjectInfoBoxPosition);
      };

      swiper
        .on('slideChangeTransitionStart', () => {
          setSwiperState({
            currentIndex: swiper.activeIndex,
            previousIndex: swiper.previousIndex,
            transitioning: true,
          });
        })
        .on('transitionEnd', updateSlider)
        .on('init', updateSlider);

      requestAnimationFrame(() => {
        swiper.init();
      });
    }
  }, [swiper]);

  const slides = projects.map(project => (
    <Slide key={project.node.id} project={project.node} />
  ));
  console.log(projectInfoBoxPosition);
  return (
    <StyledSwiper>
      <Swiper {...params}>{slides}</Swiper>
      <ProjectInfoBox
        projects={projects}
        swiperState={swiperState}
        position={projectInfoBoxPosition}
      />
    </StyledSwiper>
  );
}

Slide.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    fields: PropTypes.shape({ slug: PropTypes.string }),
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.object,
      client: PropTypes.string,
      techs: PropTypes.array,
    }),
    rawMarkdownBody: PropTypes.string,
  }),
};

ProjectSlider.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
}

export default ProjectSlider

