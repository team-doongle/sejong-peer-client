import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
        font-size: 12px;
    }
    body {
        font-family: "Noto Sans KR";
    }

`;

export default GlobalStyles;
