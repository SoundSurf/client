import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  html {
    box-sizing: border-box
  }
  
  input {
    border: none;
    border-radius: .6rem;
  }
  
  button {
    border-radius: .6rem;
  }
  
  a {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;
