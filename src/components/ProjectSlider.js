import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import ProjectInfoBox from './ProjectInfoBox';

const StyledSwiper = styled.div `
  width: 100%;
  height: 100%;

  &.swiper-container {
    overflow: visible;
  }

  .swiper-slide {
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
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  const [projectIsWiderThanWindow, setProjectIsWiderThanWindow] = useState(false);
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
    init: false,
  };

  const updateSlider = () => {
    console.log('test');
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    const { y, x, width, height } = swiper.slides[
      swiper.activeIndex
    ].getBoundingClientRect();

    setSwiperState({
      ...swiperState,
      previousIndex: null,
      transitioning: false,
    });

    setContainerDimensions({
      width: window.innerWidth - 168 < width ? window.innerWidth - 168 : width,
      height,
      x,
      y,
    });

    setProjectIsWiderThanWindow(window.innerWidth - 168 < width);

    setProjectInfoBoxPosition({
      bottom:
        windowHeight -
        (containerDimensions.y + containerDimensions.height) +
        24,
      left: projectIsWiderThanWindow ? 40 : containerDimensions.x - 48,
    });
  };

  useEffect(() => {
    if (swiper !== null && !swiper.initalized) {
      swiper
        .on('slideChangeTransitionStart', () => {
          setSwiperState({
            currentIndex: swiper.activeIndex,
            previousIndex: swiper.previousIndex,
            transitioning: true,
          });
        })
        .on('transitionEnd', () => {
          updateSlider();
        })
        .on('init', () => {
          updateSlider();
        });

      swiper.init();
    }
  }, [swiper, updateSlider]);

  const slides = projects.map(project => <Slide project={project.node} />);

  return <StyledSwiper>
    <Swiper {...params}>{slides}</Swiper>
    <ProjectInfoBox
      projects={projects}
      position={projectInfoBoxPosition}
      swiperState={swiperState}
    />
  </StyledSwiper>;
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

