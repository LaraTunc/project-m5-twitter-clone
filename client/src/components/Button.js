import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const Button = ({ children, fontSize, handleClick, setPost, disabled })=> {
    return (
        <StyledButton fontSize={fontSize} onClick={handleClick} setPost={setPost} disabled={disabled}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
outline:none;
border:none;
background-color: ${({ disabled }) => disabled ? COLORS.lightPurple: COLORS.primary } ; 
padding: 8px 12px;
border-radius:25px;
color:white;
text-align:center;
margin: 5px;
font-size: ${({ fontSize }) => fontSize};
${(disabled)=>{}};
&:hover {
    transition: transform 300ms;
    transform: ${({ disabled })=> disabled ? "" : "scale(1.1)"};
};
`;

export default Button;