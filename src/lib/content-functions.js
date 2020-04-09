import React from 'react';
import ProjectImageCaptionBlock from '../components/ProjectImageCaptionBlock';

export const processContent = content => {
  return content.split('//').map(block => {
    try {
      const shortcode = JSON.parse(block);
      switch (shortcode.name) {
        case 'image-caption-block':
          const { image, caption, xPosition, yPosition } = shortcode;
          return (
            <ProjectImageCaptionBlock image={image} xPosition={xPosition} yPosition={yPosition}>
              {caption}
            </ProjectImageCaptionBlock>
          );

        default:
          return block;
      }
    } catch (error) {
      return block;
    }
  });
};
