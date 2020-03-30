import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

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
  };

  const updateSlider = () => {
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
  };

  useEffect(() => {
    if (swiper !== null && !swiper.initialized) {
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
          console.log(swiper);
        })
        .on('init', () => {
          updateSlider();
        });
    }
  });
  const infoBoxPosition = () => {
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    return {
      bottom: windowHeight - (containerDimensions.y + containerDimensions.height) + 24,
      left: projectIsWiderThanWindow ? 40 : containerDimensions.x - 48,
    };
  };

  const slides = projects.map(project => <Slide project={project.node} />);

  return <div>
    <Swiper {...params}>{slides}</Swiper>

  </div>;
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

