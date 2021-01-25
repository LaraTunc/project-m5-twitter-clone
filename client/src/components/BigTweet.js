import React , { useState, useContext } from "react"; 
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { FaRetweet } from "react-icons/fa";
import { CurrentUserContext } from "./CurrentUserContext";

const BigTweet = ({tweet})=> {
    let isoDate = tweet.timestamp;
    const date = new Date(isoDate);
    const longdate = date.toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric'});
    const time = tweet.timestamp.slice(11,16);

    const [isLikedByCurrentUser, setIsLikedByCurrentUser]= useState(tweet.isLiked);
    const [isRetweetedByCurrentUser, setIsRetweetedByCurrentUser]= useState(tweet.isRetweeted);
    const {handleClickLike,handleClickRetweet} = useContext(CurrentUserContext);

    return (
        <Wrapper>
            {isRetweetedByCurrentUser ? <Gray><FaRetweet/>Gladstone, Esq. Remeowed</Gray> : tweet.retweetFrom && <Gray><FaRetweet/>{tweet.retweetFrom.displayName} Remeowed</Gray>}
            <Author>
                <Avatar src={tweet.author.avatarSrc} alt="user avatar" />
                <div>
                    <div><strong>{tweet.author.displayName}</strong></div>
                    <Gray>@{tweet.author.handle}</Gray>
                </div>
            </Author>
            <TweetStatus>{tweet.status}</TweetStatus>
            {tweet["media"][0] && <div><TweetMedia src={tweet["media"][0]["url"]} alt="tweet img" /></div> }
            <Underlined><Gray>{time}・{longdate}</Gray></Underlined>
            <TweetActions 
                isLikedByCurrentUser={isLikedByCurrentUser} 
                isRetweetedByCurrentUser={isRetweetedByCurrentUser}
                handleClickLike={(ev)=>{handleClickLike(ev,tweet.id,isLikedByCurrentUser, setIsLikedByCurrentUser)}}
                handleClickRetweet={(ev)=>{handleClickRetweet(ev, tweet.id,isRetweetedByCurrentUser, setIsRetweetedByCurrentUser)}}
            />
        </Wrapper>
    ); 
}; 

const Wrapper = styled.div`
margin: 10px;
padding:15px; 
border: 1px solid #ececf4;
width:90%;
* {
    margin:5px; 
};
`;

const Avatar = styled.img`
width:40px; 
height:40px;
border-radius:50%;
`;

const Author = styled.div`
display: flex; 
align-items: center;
`;

const TweetStatus = styled.div`
word-wrap: break-word;
`;

const Gray = styled.div`
color:gray;
font-size:smaller;
display: flex;
text-align:center;
`;

const Underlined = styled.div`
margin: 0px;
padding-top:10px;
padding-bottom:10px;
border-bottom:1px solid #ececf4;
`;

const TweetMedia = styled.img`
width:100%;
margin: 0px;
`;

export default BigTweet; 