import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { siteTheme } from '../Layout';
import PageTitle from '../PageTitle';

afterEach(cleanup);

const renderComponent = props =>
  render(
    <ThemeProvider theme={siteTheme}>
      <PageTitle {...props} />
    </ThemeProvider>
  );

describe('PageTitle', () => {
  it('Shows the site title and the page title separated by a slash', () => {
    const Test = renderComponent({
      pageTitle: 'Projects',
      siteTitle: 'Zach Townsend',
    });

    const { getByTestId } = Test;

    const parent = getByTestId('htag');
    const { children } = parent;

    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe('Zach Townsend');
    expect(children[1].textContent).toBe('Projects');
  });

  it('Only shows the site title if page title omitted', () => {
    const Test = renderComponent({ siteTitle: 'Zach Townsend' });
    const { container } = Test;
    const h1 = container.querySelector('h1');

    expect(h1).toBeDefined();
    expect(h1.children.length).toBe(1);
    expect(h1.firstChild.textContent).toBe('Zach Townsend');
    expect(h1.firstChild.className).toBe('site-title');
  });

  it('Only shows the page title if site title omitted', () => {
    const Test = renderComponent({ pageTitle: 'Projects' });
    const { container } = Test;
    const h1 = container.querySelector('h1');

    expect(h1).toBeDefined();
    expect(h1.children.length).toBe(1);
    expect(h1.children[0].textContent).toBe('Projects');
    expect(h1.children[0].className).toBe('page-title');
  });

  it('has h1 as the first parent', () => {
    const Test = renderComponent({
      pageTitle: 'Projects',
      siteTitle: 'Zach Townsend',
    });
    const { container } = Test;
    const h1 = container.querySelector('h1');
    expect(h1).toBeDefined();
  });

  it('displays null if neither props are entered', () => {
    const Test = renderComponent({});
    const { queryByTestId } = Test;
    expect(queryByTestId('page-title')).toBeNull();
  });
});
