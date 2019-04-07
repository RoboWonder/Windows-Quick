import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './components/Container';
import { fontFace } from './assets/fa/style';
import { fonts } from './assets/fonts';

const style = document.createElement('style');
style.textContent = `
  * {
    box-sizing: border-box;
  }
  #app{
      height: 100%;
  }
  ${fontFace()}
  
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: url(${fonts.robotoRegular}) format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  src: url(${fonts.robotoMedium}) format('woff2');
}
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  src: url(${fonts.robotoLight}) format('woff2');
}

body {
  user-select: none;
  cursor: default;
  margin: 10px;
  background-color: transparent;
  padding: 0;
  width: calc(100vw - 20px);
  height: calc(100vh - 20px);
  font-family: Roboto;
  font-weight: 400;
  overflow: hidden;
  font-size: 14px;
}
`;

document.head.appendChild(style);

ReactDOM.render(<Container />, document.getElementById('app'));
