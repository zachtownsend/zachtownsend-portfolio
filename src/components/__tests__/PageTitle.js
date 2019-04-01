import React from 'react';
import { render } from "react-testing-library"
import PageTitle from '../PageTitle';

describe("PageTitle", () => {
  it("Shows the site title and the page title separated by a slash", () => {
    const Test = <PageTitle pageTitle="Projects" siteTitle="Zach Townsend" />;

    const { getByText } = render(Test);

    const parent = getByText(/\//);
    const { children } = parent;

    expect(children.length).toBe(2);
    expect(children[0].textContent).toBe('Zach Townsend');
    expect(children[1].textContent).toBe('Projects');
  });

  it('Only shows the site title if page title omitted', () => {
    const Test = <PageTitle siteTitle="Zach Townsend" />;
    const { container } = render(Test);
    const h1 = container.querySelector('h1');

    expect(h1).toBeDefined();
    expect(h1.children.length).toBe(1);
    expect(h1.firstChild.textContent).toBe('Zach Townsend');
    expect(h1.firstChild.className).toBe('site-title');
  });

  it('Only shows the page title if site title omitted', () => {
    const Test = <PageTitle pageTitle="Projects" />;
    const { container } = render(Test);
    const h1 = container.querySelector('h1');

    expect(h1).toBeDefined();
    expect(h1.children.length).toBe(1);
    expect(h1.children[0].textContent).toBe('Projects');
    expect(h1.children[0].className).toBe('page-title');
  });

  it('has h1 as the first parent', () => {
    const Test = <PageTitle pageTitle="Projects" siteTitle="Zach Townsend" />;
    const { container } = render(Test);
    const h1 = container.querySelector('h1');
    expect(h1).toBeDefined();
  });

  it('displays null if neither props are entered', () => {
    const Test = <PageTitle />;
    const { queryByTestId } = render(Test);
    expect(queryByTestId('page-title')).toBeNull();
  });
});
