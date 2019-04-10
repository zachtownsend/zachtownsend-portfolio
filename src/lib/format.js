import sanitizeHtml from 'sanitize-html';

export function applyHighlightTags(string) {
  const regex = /__(.+?)__/g;
  const sanitisedString = sanitizeHtml(string);

  return sanitisedString.replace(regex, `<span class="highlighted">$1</span>`);
}
