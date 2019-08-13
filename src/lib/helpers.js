export const getPageTitleFromPath = location => {
  if (/^\/projects(\/.+)?/.test(location)) {
    return 'Projects';
  }

  if (/^\/workshop(\/.+)?/.test(location)) {
    return 'Workshop';
  }

  if (/^\/contact(\/.+)?/.test(location)) {
    return 'Contact';
  }

  if (/^\/blog(\/.+)?/.test(location)) {
    return 'Blog';
  }

  return null;
};
