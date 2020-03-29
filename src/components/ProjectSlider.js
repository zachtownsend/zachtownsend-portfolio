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

  useEffect(() => {
    if (swiper !== null) {
      swiper.on('slideChangeTransitionStart', () => {

      });
    }
    // swiper.params.on.slideChangeTransitionStart = () => {
    //   console.log(swiper);
    // };
  });

  const slides = projects.map(project => <Slide project={project.node} />);

  return <Swiper {...params}>{slides}</Swiper>;
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

