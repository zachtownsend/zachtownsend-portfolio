import PropTypes from 'prop-types';

const Nav = props => props.active && <p>${props.mode}</p>;

Nav.propTypes = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: PropTypes.bool
};

Nav.defaultProps = {
  mode: 'offcanvas',
  active: false
};

export default Nav;
