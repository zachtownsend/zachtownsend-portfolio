import React from 'react';
import { render, cleanup } from 'react-testing-library';
import {
  getPageTitleFromPath,
  getBasePath,
  getJustifyContentPosition,
} from '../src/lib/helpers';

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

describe('Test getBasePath', () => {
  it('returns the correct base path', () => {
    expect(getBasePath('/projects')).toBe('/projects');
    expect(getBasePath('/projects/something')).toBe('/projects');
    expect(getBasePath('/projects/foo/bar')).toBe('/projects');
    expect(getBasePath('/workshop')).toBe('/workshop');
    expect(getBasePath('/workshop/something')).toBe('/workshop');
    expect(getBasePath('/workshop/foo/bar')).toBe('/workshop');
    expect(getBasePath('/contact')).toBe('/contact');
    expect(getBasePath('/contact/something')).toBe('/contact');
    expect(getBasePath('/contact/foo/bar')).toBe('/contact');
    expect(getBasePath('/blog')).toBe('/blog');
    expect(getBasePath('/blog/something')).toBe('/blog');
    expect(getBasePath('/blog/foo/bar')).toBe('/blog');
  });
});

describe('Test getJustifyContentPosition', () => {
  it('returns "flex-start" by default', () => {
    expect(getJustifyContentPosition()).toBe('flex-start');
    expect(getJustifyContentPosition('')).toBe('flex-start');
    expect(getJustifyContentPosition(null)).toBe('flex-start');
  });

  it('returns "flex-start" when "left" or "flex-start" is passed', () => {
    expect(getJustifyContentPosition('left')).toBe('flex-start');
    expect(getJustifyContentPosition('flex-start')).toBe('flex-start');
  });

  it('returns "flex-end" when "right" or "flex-end" is passed', () => {
    expect(getJustifyContentPosition('right')).toBe('flex-end');
    expect(getJustifyContentPosition('flex-end')).toBe('flex-end');
  });

  it('returns "center" when "center" is passed', () => {
    expect(getJustifyContentPosition('center')).toBe('center');
  });

  it('returns correct "space" values when passed', () => {
    expect(getJustifyContentPosition('space-around')).toBe('space-around');
    expect(getJustifyContentPosition('space-between')).toBe('space-between');
    expect(getJustifyContentPosition('space-evenly')).toBe('space-evenly');
  });

  it('throws an error if a string is not passed', () => {
    expect(() => {
      getJustifyContentPosition(10);
    }).toThrow(new Error('Invalid type. Must be a string, number passed.'));

    expect(() => {
      getJustifyContentPosition({});
    }).toThrowError(
      new Error('Invalid type. Must be a string, object passed.')
    );

    expect(() => {
      getJustifyContentPosition(['test', 'test1']);
    }).toThrowError(
      new Error('Invalid type. Must be a string, object passed.')
    );

    expect(() => {
      getJustifyContentPosition(true);
    }).toThrowError(
      new Error('Invalid type. Must be a string, boolean passed.')
    );

    expect(() => {
      getJustifyContentPosition(Symbol());
    }).toThrowError(
      new Error('Invalid type. Must be a string, symbol passed.')
    );

    expect(() => {
      getJustifyContentPosition(function() {
        return false;
      });
    }).toThrowError(
      new Error('Invalid type. Must be a string, function passed.')
    );
  });

  it('throws an error if any other value passed', () => {
    expect(() => {
      getJustifyContentPosition('asdfasdfasd');
    }).toThrow(
      new Error(
        `Invalid string. Must be one of 'left', 'right', 'flex-start', 'flex-end', 'center', 'space-around', 'space-between' or 'space-evenly'`
      )
    );
  });
});
