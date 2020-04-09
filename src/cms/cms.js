import CMS from 'netlify-cms';
import React, { Component } from 'react';

import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';

import ProjectImageCaptionBlock from '../components/ProjectImageCaptionBlock';

const { registerPreviewTemplate } = CMS;

registerPreviewTemplate('index', IndexPagePreview);
registerPreviewTemplate('blog', BlogPostPreview);

CMS.registerEditorComponent({
  // Internal id of the component
  id: 'image-caption-block',
  // Visible label
  label: 'Image Caption Block',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: 'image', label: 'Image', widget: 'image' },
    { name: 'caption', label: 'Image Caption', widget: 'text' },
    {
      name: 'xPosition',
      label: 'Caption Horizontal Position',
      widget: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'yPosition',
      label: 'Caption Vertical Position',
      widget: 'select',
      options: [
        { label: 'Top', value: 'left' },
        { label: 'Middle', value: 'middle' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^\/\/{ name: 'image-caption-block', component: 'ProjectImageCaptionBlock', image: '(.*)', caption: '(.*)', xPosition: '(.*)', yPosition: '(.*)' }}\/\/$/,
  // Function to extract data elements from the regexp match
  fromBlock(match) {
    console.log(match);
    return {
      image: match[0],
      caption: match[1],
      xPosition: match[2],
      yPosition: match[3],
    };
  },
  // Function to create a text block from an instance of this component
  toBlock(obj) {
    const { image, caption, xPosition, yPosition } = obj;
    return `//{ name: 'image-caption-block', component: 'ProjectImageCaptionBlock', image: '${image}', caption: '${caption}', xPosition: '${xPosition}', yPosition: '${yPosition}' }//`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview(obj) {
    const { image, caption } = obj;
    return (
      <ProjectImageCaptionBlock image={image}>
        {caption}
      </ProjectImageCaptionBlock>
    );
  },
});
