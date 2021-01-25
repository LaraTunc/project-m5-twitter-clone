import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigTweet from "./BigTweet";
import PageTemplate from "./PageTemplate";

const TweetDetails = () => {
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState(null);
    const [status, setStatus] = useState("loading");
    
    useEffect(() => {
        fetch(`/api/tweet/${tweetId}`)
            .then((res) => res.json())
            .then((json) => {
                setTweet(json.tweet);
                setStatus("idle");
            });
        }, [tweetId]);

    useEffect(()=>{
        if(tweet) {
            setStatus("idle")
        };
    },[tweet]);
    
    return (
        <PageTemplate status={status}>
            {tweet && 
            <BigTweet tweet={tweet}/>
            }
        </PageTemplate>
    );
};

export default TweetDetails;