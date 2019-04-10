import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { applyHighlightTags } from '../src/lib/format';

afterEach(cleanup);

describe('Test applyHighlightTags function', () => {
  it('returns a string', () => {
    const string = applyHighlightTags(
      'This is a __highlighted__ piece of text'
    );

    expect(typeof string).toBe('string');
  });

  it('puts a substring wrapped in __ into a <span class="highlighted"> tag', () => {
    const string = applyHighlightTags(
      'This is a __highlighted__ piece of text'
    );
    expect(string).toBe(
      'This is a <span class="highlighted">highlighted</span> piece of text'
    );
  });

  it('wraps multiple substrings in the highlight tag', () => {
    const string = applyHighlightTags(
      'This is a __highlighted__ piece of __text__'
    );
    expect(string).toBe(
      'This is a <span class="highlighted">highlighted</span> piece of <span class="highlighted">text</span>'
    );
  });

  it('puts tagged substring in tag if the tag is placed at the front of the string', () => {
    const string = applyHighlightTags(
      '__This is__ a highlighted piece of text'
    );
    expect(string).toBe(
      `<span class="highlighted">This is</span> a highlighted piece of text`
    );
  });

  it('puts tagged substring in tag if the tag is placed at the end of the string', () => {
    const string = applyHighlightTags(
      'This is a highlighted __piece of text__'
    );

    expect(string).toBe(
      `This is a highlighted <span class="highlighted">piece of text</span>`
    );
  });

  it('sanitises HTML strings', () => {
    const string = applyHighlightTags(
      'This is a <span>dodgy</span> highlighted __piece of text__'
    );

    expect(string).toBe(
      'This is a dodgy highlighted <span class="highlighted">piece of text</span>'
    );
  });
});
