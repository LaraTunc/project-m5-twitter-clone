import React , { useState, useContext } from "react"; 
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { useHistory } from "react-router-dom";
import { FaRetweet } from "react-icons/fa";
import { COLORS, SIZES } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";

const SmallTweet = ({tweet})=> {
    const isoDate = tweet.timestamp;
    const date = new Date(isoDate);
    const longdate = date.toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric'});
    const history = useHistory();

    const [isLikedByCurrentUser, setIsLikedByCurrentUser]= useState(tweet.isLiked);
    const [isRetweetedByCurrentUser, setIsRetweetedByCurrentUser]= useState(tweet.isRetweeted);
    const {handleClickLike,handleClickRetweet} = useContext(CurrentUserContext);

    const handleClickTweet = (tweetid)=>{
        history.push(`/tweet/${tweetid}`);
    };

    const handleClickAuthor = (ev, profileId)=>{
        ev.stopPropagation();
        history.push(`/${profileId}`);
    };

    return (
        <Wrapper tabIndex="0" onClick={()=>{handleClickTweet(tweet.id)}} aria-label="view tweet">
            {isRetweetedByCurrentUser ? <Gray><FaRetweet/>Gladstone, Esq. Remeowed</Gray> : tweet.retweetFrom && <Gray><FaRetweet/>{tweet.retweetFrom.displayName} Remeowed</Gray>}
            <Wrapper2>
                <div>
                    <Avatar src={tweet.author.avatarSrc} alt="user avatar" />
                </div>
                <Div>
                    <Author>
                        <DisplayName onClick={(ev)=>{handleClickAuthor(ev, tweet.author.handle)}}>
                            <strong>{tweet.author.displayName}</strong>
                        </DisplayName>
                        <Gray>@{tweet.author.handle}・{longdate}</Gray>
                    </Author>
                    <TweetStatus>{tweet.status}</TweetStatus>
                    {tweet["media"][0] && <div><TweetMedia src={tweet["media"][0]["url"]} alt="tweet img" /></div> }
                    <TweetActions 
                        isLikedByCurrentUser={isLikedByCurrentUser} 
                        isRetweetedByCurrentUser={isRetweetedByCurrentUser}
                        handleClickLike={(ev)=>{handleClickLike(ev,tweet.id,isLikedByCurrentUser, setIsLikedByCurrentUser)}}
                        handleClickRetweet={(ev)=>{handleClickRetweet(ev, tweet.id,isRetweetedByCurrentUser, setIsRetweetedByCurrentUser)}}
                    />
                </Div>
            </Wrapper2>
        </Wrapper>
    ); 
}; 

const Wrapper = styled.div`
border: 0.1px solid ${COLORS.lightgrey};
box-sizing: border-box;
* {
    margin:5px; 
};
`;

const Wrapper2 = styled.div`
display: flex;
`;

const Avatar = styled.img`
width:40px; 
height:40px;
border-radius:50%;
`;

const Div= styled.div`
width:90%;
`;

const Gray = styled.div`
color:gray;
font-size:smaller;
display: flex;
text-align:center;
`;

const Author = styled.div`
display:flex; 
margin: 0px;
`;

const TweetStatus = styled.div`
word-wrap: break-word;
`;

const TweetMedia = styled.img`
width:100%;
margin: 0px;
`;

const DisplayName=styled.button`
outline: none; 
border:none;
border-bottom: 1.5px solid white;
background-color:white;
margin-left:0px;
padding-left:0px;
&:hover {
    border-bottom: 1.5px solid black;
};
`;


export default SmallTweet; 