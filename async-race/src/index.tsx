import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: #030303;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  #root {
    max-width: 1440px;
    margin: 0 auto;
    padding: 1rem;
    color: #fafafa;
  }
`;

const app = (
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
