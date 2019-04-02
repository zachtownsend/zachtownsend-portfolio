import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHamburger = styled.button`
  display: block;
  width: 44px;
  height: 44px;
  padding: 8px 5px 7px;
  background: transparent;
  border: 0;

  &:hover {
    cursor: pointer;
  }

  .line-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: 100%;
  }

  span {
    display: block;
    width: 34px;
    height: 2px;
    background-color: white;
  }
`;

export default class Hamburger extends React.Component {
  componentDidMount = () => {
    const { onResize } = this.props;

    onResize(this.getBurgerLinesPositions());

    window.addEventListener('resize', () => {
      const positions = this.getBurgerLinesPositions();
      onResize(positions);
    });
  };

  getBurgerLinesPositions() {
    return Array.from(this.lineWrapper.children).map(
      line => line.getBoundingClientRect().y
    );
  }

  render() {
    return (
      <StyledHamburger>
        <div
          ref={c => {
            this.lineWrapper = c;
          }}
          className="line-wrapper"
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      </StyledHamburger>
    );
  }
}

// function Hamburger(props) {
//   window.addEventListener('resize', () => {
//     props.onResize('test');
//   });

//   return (
//     <StyledHamburger>
//       <div className="line-wrapper">
//         <span />
//         <span />
//         <span />
//         <span />
//       </div>
//     </StyledHamburger>
//   );
// }

Hamburger.propTypes = {
  mode: PropTypes.bool,
  active: PropTypes.bool,
  onResize: PropTypes.func,
};

Hamburger.defaultProps = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: false,
  onResize: () => false,
};

// export default Hamburger;
