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

export const getJustifyContentPosition = function(position = 'left') {
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
      if (typeof position !== 'string') {
        throw new Error('Invalid type. Must be a string.');
      }

      throw new Error(
        `Invalid string. Must be one of 'left', 'right', 'flex-start', 'flex-end', 'center', 'space-around', 'space-between' or 'space-evenly'`
      );
  }
};
