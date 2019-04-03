import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from './components/Container';
import { fontFace } from './assets/fa/style';

const style = document.createElement('style');
style.textContent = `
body {
    user-select: none;
    cursor: default;
    margin: 10px;
    background-color: transparent;
    padding: 0;
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
  #app{
      height: 100%;
  }
  ${fontFace()}
`;

document.head.appendChild(style);

ReactDOM.render(<Container />, document.getElementById('app'));
