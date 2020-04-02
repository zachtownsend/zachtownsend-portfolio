import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import TransitionLink from 'gatsby-plugin-transition-link';
import classNames from 'classnames';
import TweenMax from 'gsap/umd/TweenMax';
import PeepholeText from './PeepholeText';
import Button from './Button';

const ProjectInfo = styled.div `
  position: fixed;
  left: 0;
  z-index: 1;
  padding: 48px 64px;
  display: block;
  background-color: rgba(0, 0, 0, 0.9);
  color: ${({ theme }) => theme.white};
  transition: transform 0.4s ease-in-out;
  bottom: ${({ bottom }) => bottom}px;
  transform: translate(${({ left }) => left}px, -24px);

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    left: 20px;
    bottom: 20px;
    transform: translate(0, 0);
    padding: 32px 44px;
  }

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
    delay: ({
      delay
    }) => delay,
  },
  exit: {
    opacity: 0,
  },
});

// const projectTransition = entryImageBox => {
//   const { currentIndex } = this.state;
//   const exitImage = this.projectImage.current;
//   const exitImageBox = exitImage.getBoundingClientRect();
//   const toPositions = {
//     x: entryImageBox.x - exitImageBox.x,
//     y: entryImageBox.y - exitImageBox.y,
//     scale: entryImageBox.width / exitImageBox.width,
//   };

//   const projects = Array.from(
//     exitImage
//       .closest('.swiper-wrapper')
//       .querySelectorAll('.project-container')
//   );

//   TweenMax.to(exitImage, 1, {
//     x: toPositions.x,
//     y: toPositions.y,
//     scale: toPositions.scale,
//     ease: Power2.easeInOut,
//   });

//   projects.forEach((project, index) => {
//     if (index < currentIndex) {
//       TweenMax.to(project, 1, { x: '-25vw', alpha: 0 });
//     } else if (index > currentIndex) {
//       TweenMax.to(project, 1, { x: '25vw', alpha: 0 });
//     }
//   });
// };

function ProjectInfoBox({ swiper, projects, swiperState, position }) {
  console.log(swiper);
  const { currentIndex, previousIndex, transitioning } = swiperState;
  const currentProject = projects[currentIndex].node;
  const previousProject = projects[transitioning ? previousIndex : currentIndex].node;

  const transitionToProject = entryImageBox => {
    if (!swiper) {
      return false;
    }

    // const { slides } = swiper;
    const exitImage = swiper[currentIndex].querySelector('img');
    const exitImageBox = exitImage.getBoundingClientRect();
    const toTransitions = {
      x: entryImageBox.x - exitImageBox.x,
      y: entryImageBox.y - exitImageBox.y,
      scale: entryImageBox.width / exitImageBox.width,
    };
    console.log(toTransitions);
    TweenMax.to(exitImage, 1, {
      x: toTransitions.x,
      y: toTransitions.y,
      scale: toTransitions.scale,
      ease: Power2.easeInOut,
    });

    // swiper.forEach((project, index) => {
    //   if (index < currentIndex) {
    //     TweenMax.to(project, 1, { x: '-25vw', alpha: 0 });
    //   } else if (index > currentIndex) {
    //     TweenMax.to(project, 1, { x: '25vw', alpha: 0 });
    //   }
    // });
  };

  return (
    <ProjectInfo {...position}>
      <header>
        <PeepholeText
          tag="h2"
          nowrap
          dynamicWidth
          direction={previousIndex > currentIndex ? 'up' : 'down'}
          nextContent={
            transitioning
              ? currentProject.frontmatter.title
              : null
          }
        >
          {
            previousProject.frontmatter.title
          }
        </PeepholeText>
        <PeepholeText
          tag="p"
          className="client"
          direction={previousIndex < currentIndex ? 'up' : 'down'}
          nextContent={
            transitioning
              ? currentProject.frontmatter.client
              : null
          }
        >
          {
            previousProject.frontmatter.client
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
            {currentProject.frontmatter.techs.map(
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
            to={currentProject.fields.slug}
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
                  const image = node.querySelector('.image-container > img');
                  console.log(node);
                  transitionToProject(image.getBoundingClientRect());
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
  )
}

ProjectInfoBox.propTypes = {

}

export default ProjectInfoBox

