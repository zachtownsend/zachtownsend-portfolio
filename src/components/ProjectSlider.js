import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';
import TweenMax from 'gsap/umd/TweenMax';
import 'swiper/swiper.scss';
import ProjectInfoBox from './ProjectInfoBox';

const StyledSwiper = styled.div`
  opacity: ${({ swiperLoaded }) => (swiperLoaded ? 1 : 0)};
  transition: opacity 0.6s linear 0.6s;

  &.swiper-container {
    overflow: visible;
  }

  .swiper-slide {
    width: auto;
    max-width: 100%;

    .project-container {
      line-height: 0;
      height: 75vh;

      @media (max-width: 768px) {
        height: calc(100vh - 40px);

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      img {
        height: 100%;
        width: auto;
        transform-origin: top left;

        &.cover {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
function Slide({ project }) {
  return (
    <div className="swiper-slide" key={project.id}>
      <div className="project-container">
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
  const [swiperLoaded, setSwiperLoaded] = useState(false);

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
        .on('init', updateSlider)
        .on('resize', () => {
          swiper.slides.each(index => {
            const currentSlide = swiper.slides[index];
            const image = currentSlide.querySelector('img');
            if (currentSlide.offsetWidth > window.innerWidth - 168) {
              if (!image.classList.contains('cover')) {
                image.classList.add('cover')
              }
            } else if (image.classList.contains('cover')) {
              image.classList.remove('cover')
            }
          });
        });

      swiper.init();
    }

    setSwiperLoaded(true);
  }, [swiper]);

  const slides = projects.map(project => (
    <Slide key={project.node.id} project={project.node} />
  ));

  const transitionToProject = entryImageBox => {
    if (!swiper) {
      return false;
    }

    const exitImage = swiper.slides[swiperState.currentIndex].querySelector('img');
    const exitImageBox = exitImage.getBoundingClientRect();
    const toTransitions = {
      x: entryImageBox.x - exitImageBox.x,
      y: entryImageBox.y - exitImageBox.y,
      scale: entryImageBox.width / exitImageBox.width,
    };

    TweenMax.to(exitImage, 1, {
      x: toTransitions.x,
      y: toTransitions.y,
      scale: toTransitions.scale,
      ease: Power2.easeInOut,
    });

    // slides.forEach((project, index) => {
    //   if (index < swiperState.currentIndex) {
    //     TweenMax.to(project, 1, { x: '-25vw', alpha: 0 });
    //   } else if (index > swiperState.currentIndex) {
    //     TweenMax.to(project, 1, { x: '25vw', alpha: 0 });
    //   }
    // });
  };

  const pageTransition = ({ node }) => {
    requestAnimationFrame(() => {
      const image = node.querySelector('.image-container > img');
      transitionToProject(image.getBoundingClientRect());
    });
  };

  return (
    <StyledSwiper swiperLoaded={swiperLoaded}>
      <Swiper {...params}>{slides}</Swiper>
      <ProjectInfoBox
        projects={projects}
        swiper={swiper}
        transitioning={swiperState.transitioning}
        position={projectInfoBoxPosition}
        transition={pageTransition}
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

export default ProjectSlider;
