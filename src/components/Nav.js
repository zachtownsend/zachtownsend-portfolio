import PropTypes from 'prop-types';

const Nav = props => ();

Nav.propTypes = {
  mode: PropTypes.oneOf(['side', 'offcanvas']),
  active: PropTypes.bool
};

Nav.defaultProps = {
  mode: 'offcanvas',
  active: false
};

export default Nav;
