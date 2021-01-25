import React from "react"; 
import { FiHeart } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import styled from "styled-components";
import { COLORS } from "../constants";

const TweetActions = ({isLikedByCurrentUser,isRetweetedByCurrentUser, handleClickLike, handleClickRetweet}) => { 
    return (
        <Wrapper>
            <ActionWrapper>
                <Action 
                    kind="comment" 
                    color={COLORS.lightPurple}
                    >
                        <FaRegComment/>
                </Action>
            </ActionWrapper>
            <ActionWrapper>
                <Action 
                    kind="retweet" 
                    color={COLORS.lightgrey}
                    frameColor = {isRetweetedByCurrentUser ? COLORS.green : "black" }
                    onClick={handleClickRetweet}
                >
                    <FaRetweet />
                </Action>
                {isRetweetedByCurrentUser ? "1" : ""}
            </ActionWrapper>
            <ActionWrapper>
                <Action 
                kind="like" 
                color={COLORS.pink}
                frameColor = {isLikedByCurrentUser ? COLORS.green : "black" }
                onClick={handleClickLike}
                >
                    <FiHeart/>
                </Action>
                {isLikedByCurrentUser ? "1" : ""}
            </ActionWrapper>
            <ActionWrapper>
                <Action 
                    kind="upload" 
                    color={COLORS.lightPurple}
                >
                    <FiUpload/>
                </Action>
            </ActionWrapper>            
        </Wrapper>
    ); 
}; 

const Wrapper = styled.div`
display: flex;
justify-content:space-between;
`;

const ActionWrapper = styled.div`
display: flex;
font-size:smaller;
align-items:center;
`;

const Action = styled.button`
display: flex; 
align-items:center;
background-color: white;
border:none;
border-radius:50%;
padding:0px;
margin: 0px;
color: ${({frameColor})=> frameColor};
&:focus, &:hover {
    box-shadow: none;
    background-color: ${({ color }) => color };
};
&:hover {
transition: transform 300ms;
transform: scale(1.2);
};
`;

export default TweetActions; 