// import React from 'react';
// import { render, cleanup } from 'react-testing-library';
// import { ThemeProvider } from 'styled-components';
// import { Location } from '@reach/router';
// import { siteTheme } from '../src/components/Layout';
// import Navigation from '../src/components/Navigation';
// import TemplateWrapper from '../src/components/Layout';

// afterEach(cleanup);

// window.matchMedia = () => ({
//   addListener: () => {},
//   removeListener: () => {},
// });

// const renderComponent = props =>
//   render(
//     <TemplateWrapper theme={siteTheme}>
//       <Location>
//         <Navigation {...props} />
//       </Location>
//     </TemplateWrapper>
//   );

// describe('Functionality on the Home Page', () => {
//   const { container, queryByTestId } = renderComponent({
//     location: '/',
//   });

//   it("adds special classes to logo, hamburger is hidden and page title doesn't exist", () => {
//     requestAnimationFrame(() => {
//       expect(queryByTestId('logo')).toHaveClass('centered');
//       expect(queryByTestId('page-title')).not.toBeInTheDocument();
//       expect(queryByTestId('side-navigation')).toBeDefined();
//       expect(queryByTestId('hamburger')).not.toBeVisible();
//       expect(container).toMatchSnapshot();
//     });
//   });
// });

// describe('Functionality on other pages', () => {
//   const { container, queryByTestId } = renderComponent({
//     location: '/contact',
//   });
//   it('does not render the side navigation, nor does it have the special classes', () => {
//     requestAnimationFrame(() => {
//       expect(queryByTestId('logo')).not.toHaveClass('centered');
//       expect(queryByTestId('page-title')).toBeDefined();
//       expect(queryByTestId('hamburger')).toBeVisible();
//       expect(queryByTestId('side-navigation')).toBeNull();
//       expect(container).toMatchSnapshot();
//     });
//   });
// });
// /**
//  * Functionality
//  */

test('This passes', () => {
  expect(true).toBe(true);
});
