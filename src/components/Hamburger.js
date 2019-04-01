import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHamburger = styled.button`
  display: block;
  width: 44px;
  height: 44px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  background: transparent;
  border: 0;

  span {
    display: block;
    width: 38px;
    height: 1px;
    background-color: white;
  }
`;

function Hamburger(props) {
  return (
    <StyledHamburger>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </StyledHamburger>
  )
}

Hamburger.propTypes = {
  mode: PropTypes.bool,
  active: PropTypes.bool,
};

Hamburger.defaultProps = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: false
};

export default Hamburger

