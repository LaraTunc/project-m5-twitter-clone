import React from "react";
import styled , { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const Loading = ()=> {
    return (
        <Wrapper><FaSpinner/></Wrapper> 
    ); 
}; 

const spin = keyframes`
from {
    transform: rotate(0deg);
} to {
    transform: rotate(360deg);
}
`;

const Wrapper = styled.div`
width: 100%; 
height:100vh; 
display:flex; 
flex-direction:column; 
justify-content:center;
align-items:center; 
animation: ${spin} 500ms;
`;

export default Loading; 
