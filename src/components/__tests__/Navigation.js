import React from 'react';
import { render, cleanup, getByTestId } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { siteTheme } from '../Layout';
import Navigation from '../Navigation';

afterEach(cleanup);

window.matchMedia = () => ({
  addListener: () => {},
  removeListener: () => {},
});

const renderComponent = props =>
  render(
    <ThemeProvider theme={siteTheme}>
      <Navigation {...props} />
    </ThemeProvider>
  );

describe('Functionality on the Home Page', () => {
  const { queryByTestId } = renderComponent({ location: '/' });
  it("adds special classes to logo, hamburger is hidden and page title doesn't exist", () => {
    expect(queryByTestId('logo')).toHaveClass('centered');
    expect(queryByTestId('page-title')).toBeNull();
    expect(queryByTestId('side-navigation')).toBeDefined();
    expect(getComputedStyle(queryByTestId('hamburger')).visibility).toBe(
      'hidden'
    );
  });
});

describe('Functionality on other pages', () => {
  it('does not display the side navigation, nor does it have the special classes', () => {});
});
/**
 * Functionality
 */
