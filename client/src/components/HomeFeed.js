import React, { useEffect, useState, useContext } from "react";
import SmallTweet from "./SmallTweet";
import PageTemplate from "./PageTemplate";
import PostTweet from "./PostTweet";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";

const HomeFeed = () => {
    const [status, setStatus] = useState("loading");
    const [homefeed, setHomefeed] = useState(null);
    const { sortArrayPerTimestamp } = useContext(CurrentUserContext);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/me/home-feed")
            .then((res) => {
                if(!res.ok) {
                    setError(true);
                }; 
                return res.json();
            })
            .then((json) => {
                const tweetsArrayUnsorted = Object.values(json.tweetsById); 
                sortArrayPerTimestamp(tweetsArrayUnsorted);
                setHomefeed(tweetsArrayUnsorted);
            });
    }, [sortArrayPerTimestamp]);

    useEffect(()=>{
        if(homefeed) {
            setStatus("idle")
        };
    },[homefeed]);

    const addPostedTweet = (newTweet) =>{
        console.log(newTweet,"newTweet");
        setHomefeed([newTweet,...homefeed]);
    };

    return (
        <PageTemplate status={status} error={error}>
            <Home>Home</Home>
            <PostTweet addPostedTweet={addPostedTweet}/>
            {homefeed && homefeed.map((tweet)=>{
                return (<SmallTweet key={tweet.id} tweet={tweet}/>)
            })}
        </PageTemplate>
    );
};

const Home = styled.div`
border: 0.1px solid ${COLORS.lightgrey};
padding:5px;
`;

export default HomeFeed;