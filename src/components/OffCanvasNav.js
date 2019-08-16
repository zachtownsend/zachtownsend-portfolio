import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionLink from 'gatsby-plugin-transition-link';
import { getPageTitleFromPath } from '../lib/helpers';

const StyledOffCanvasMenu = styled.div`
  position: fixed;
  left: 20px;
  top: 20px;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);

  ul {
    text-align: center;

    li {
      font-size: 36px;
      font-family: ${props => props.theme.displayFontFamily};
      color: ${props => props.theme.white};
      font-weight: 100;

      a {
        color: inherit;
        padding-right: ${34 + 20}px;
        position: relative;

        span {
          display: inline-block;

          &.line {
            height: 2px;
            width: 34px;
            background-color: ${props => props.theme.white};
            position: absolute;
            right: 0;
            top: calc(50% - 1px);
          }
        }
      }
    }
  }
`;

function OffCanvasNav(props) {
  const { links, onLinkClick } = props;
  return (
    <StyledOffCanvasMenu>
      <ul>
        {links.map(link => (
          <li>
            <TransitionLink to={link} onClick={onLinkClick}>
              <span className="text-wrapper">{getPageTitleFromPath(link)}</span>
              <span className="line" />
            </TransitionLink>
          </li>
        ))}
      </ul>
    </StyledOffCanvasMenu>
  );
}

OffCanvasNav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
  onLinkClick: PropTypes.func,
};

export default OffCanvasNav;
