import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import square from "../assets/square.png";
import checked from "../assets/checked.png";
import MobileGIF from "../assets/hmc_yo.gif";

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
        
        @media only screen and (max-width: 1024px) {
            width: 100%;
            height: 100%;
            background-image: url(${MobileGIF});
            background-size: 100% auto;
            background-repeat: no-repeat;
        }
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
        @media only screen and (max-width: 770px) {
            max-width: 320px;
            font-size: 10px;
            height: 25px;
        }
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
        @media only screen and (max-width: 770px) {
            width: 320px;
            font-size: 10px;
            height: 25px;
            padding-left: 5px;
            padding-right: 5px;
            padding-top: 0px;
            padding-bottom: 0px;
            font-size: 10px;
        }
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
      @media only screen and (max-width: 770px) {
          width: 15px;
          height: 15px;
          border-radius: 3px;
          font-weight:100;
        }
    }   
    input[type="radio"]:checked + span{
      /* border:1px solid #23a3a7; */
      /* background:#23a3a7; */
      color:#fff;
      background:url(${checked});
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center;
      
      @media only screen and (max-width: 770px) {
          background-size: 10px 10px;
        }
    }
    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }
`;

export default globalStyles;
