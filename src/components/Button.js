import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  display: inline-block;

  a, button {
    display: block;
    font-size: 14px;
    line-height: 1.143;
    padding: 9px 12px 11px;
    min-width: 145px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme.white};
    font-weight: 100;
  }
`;

export default Button;
