import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import square from "../assets/square.png";
import checked from "../assets/checked.png";

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
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-height: 900px;
        font-size: 1.5rem;
        font-weight: 50;
        font-family: 'Hyundai Sans Text Office';
        color: white;
        background-color: white;
    }
    input{
        font-size: 16px;
        height: 35px;
        color: white;
        border: solid 1px white;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0);
        background-repeat: none;
        padding: 10px;
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
    input[type='radio']{
        width: 2rem !important;
        height: 2rem !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance:none;
        outline: none;
        box-shadow: none;
        background: url(${square})no-repeat;
    }
    input[type='radio']:checked{
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance:none;
        box-shadow: none;
        background: url(${square}) no-repeat;
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
    input[type="radio"]{
      display:none;
    }   
    input[type="radio"] + span{
      display:inline-block;
      background:none;
      border:1px solid #dfdfdf;  
      padding:0px 10px;
      text-align:center;
      line-height:33px;
      height:30px;
      width: 35px;
      border-radius: 5px;
      font-weight:500;
      cursor:pointer;
    }   
    input[type="radio"]:checked + span{
      /* border:1px solid #23a3a7; */
      /* background:#23a3a7; */
      color:#fff;
      background:url(${checked});
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center;
    }
`;

export default globalStyles;
