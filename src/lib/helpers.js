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

export const getBasePath = path => {
  const matches = path.match(/^\/[^\/]+/);

  return matches[0];
};

export const getJustifyContentPosition = function(position = 'left') {
  if (typeof position !== 'string' && position !== null) {
    throw new Error(
      `Invalid type. Must be a string, ${typeof position} passed.`
    );
  }

  switch (position) {
    case '':
    case null:
    case 'left':
      return 'flex-start';

    case 'right':
      return 'flex-end';

    case 'center':
    case 'flex-start':
    case 'flex-end':
    case 'space-between':
    case 'space-around':
    case 'space-evenly':
      return position;

    default:
      throw new Error(
        `Invalid string. Must be one of 'left', 'right', 'flex-start', 'flex-end', 'center', 'space-around', 'space-between' or 'space-evenly'`
      );
  }
};

export const getColumnWidth = (columns, baseColumns = 12) => `${100 * (columns / baseColumns)}%`;
