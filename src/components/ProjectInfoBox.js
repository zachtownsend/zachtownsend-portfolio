import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import TransitionLink from 'gatsby-plugin-transition-link';
import classNames from 'classnames';
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

function ProjectInfoBox({ projects, swiperState, position }) {
  const { currentIndex, previousIndex, transitioning } = swiperState;
  const { bottom, left } = position;
  const currentProject = projects[currentIndex].node;
  const previousProject = projects[transitioning ? previousIndex : currentIndex].node;

  return (
    <div style={{

    }}>
      <ProjectInfo
        style={{
          bottom: `${bottom}px`,
          transform: `translateX(${left}px)`
        }}
      >
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
                    const image = node.querySelector('.image-container');
                    this.projectTransition(image.getBoundingClientRect());
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
    </div>
  )
}

ProjectInfoBox.propTypes = {

}

export default ProjectInfoBox

