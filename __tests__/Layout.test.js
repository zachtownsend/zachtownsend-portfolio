import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { getPageTitleFromPath } from '../src/components/Layout';

afterEach(cleanup);

describe('Test getPageTitleFromLocation', () => {
  it('returns false if on homepage', () => {
    expect(getPageTitleFromPath('/')).toBeNull();
  });

  it('returns the page title "Projects" if on the projects page', () => {
    expect(getPageTitleFromPath('/projects')).toBe('Projects');
  });

  it('returns the page title "Projects" if on a single project page', () => {
    expect(getPageTitleFromPath('/projects/foobar')).toBe('Projects');
  });

  it('returns the page title "Workshop" if on the workshop page', () => {
    expect(getPageTitleFromPath('/workshop')).toBe('Workshop');
  });

  it('returns the page title "Workshop" if on a single workshop page', () => {
    expect(getPageTitleFromPath('/workshop/foobar')).toBe('Workshop');
  });

  it('returns the page title "Contact" if on the contact page', () => {
    expect(getPageTitleFromPath('/contact')).toBe('Contact');
  });

  it('returns the page title "Blog" if on the blog page', () => {
    expect(getPageTitleFromPath('/blog')).toBe('Blog');
  });

  it('returns the page title "Blog" if on a single blog page', () => {
    expect(getPageTitleFromPath('/blog/foobar')).toBe('Blog');
  });
});
