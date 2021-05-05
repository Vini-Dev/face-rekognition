import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 * {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
    outline: 0;
  }
  body {
    -webkit-font-smoothing: antialiased;
    font-family: 'Open Sans', sans-serif;
    background-color: #000000;
    input,
    textarea,
    button {
      font-family: 'Open Sans', sans-serif;
    }
    button {
      cursor: pointer;
    }
    .root-link-button {
      text-decoration: none;
    }
  }
`;

export default GlobalStyle;
