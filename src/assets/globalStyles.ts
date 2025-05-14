import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body, html, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Segoe UI, sans-serif;
    overflow: hidden;
  }
`;