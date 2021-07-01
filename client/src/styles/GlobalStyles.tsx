import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import mainImg from "../image/Main.png";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        width: 100%;
        font-size: 1.5rem;
        font-weight: 50;
        /* font-family: Helvetica; */
        font-family: "Noto Sans CJK KR";
        color: white;
        background-color: white;
        background-image: url(${mainImg});
    }
    input{
        font-size: 16px;
        height: 35px;
        color: white;
        border: solid 1px white;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0)
    }
    input:focus{
        outline: none;
    }
    input[type="file"]{
        position: absolute; 
        width: 1px; 
        height: 1px; 
        padding: 0; 
        margin: -1px; 
        overflow: hidden; 
        clip:rect(0,0,0,0); 
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0)
    }
    select {
        padding: 5px;
        text-align: center;
        font-size: 1rem;
        height: 35px;
        color: white;
        border: solid 1px white;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0);
    }
    select:focus {
        outline: none;
    }
    option {
        color: black;
    }
`;

export default globalStyles;
