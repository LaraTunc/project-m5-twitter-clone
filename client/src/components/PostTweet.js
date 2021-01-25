import React , { useEffect, useState, useContext } from "react"; 
import styled from "styled-components";
import { COLORS, SIZES } from "../constants";
import Button from "./Button";
import { CurrentUserContext } from "./CurrentUserContext";

const PostTweet = ({addPostedTweet})=>{
    const { currentUser } = useContext(CurrentUserContext);
    const [post, setPost] = useState("");
    const [letterCount, setLetterCount] = useState(0);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        letterCount===0 || letterCount>280 ? setDisabled(true) : setDisabled(false);
    }, [letterCount, setDisabled]);

    const handleChange =(ev)=>{
        const post= ev.target.value;
        setPost(post);
        setLetterCount(post.length);
    };

    const handleClick = (ev)=> {
        ev.preventDefault();
        setPost("");

        fetch("/api/tweet", {
            method: "POST",
            body: JSON.stringify({status:post}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const newTweet = {
                    author: {...currentUser.profile}, 
                    isLiked: false,
                    isRetweeted: false, 
                    numLikes: 0, 
                    numRetweets: 0, 
                    ...json.tweet, 
                    id: `${json.tweet.id}`
            };
                addPostedTweet(newTweet);
            })
    };

    return (
        <Wrapper>
            <Avatar 
                src={currentUser.profile.avatarSrc} 
                alt="user avatar" 
            />
            <Form>
                <Input 
                    type="text" 
                    name="tweet" 
                    placeholder="What's happening?"
                    value={post} 
                    onChange={handleChange} 
                />
                <Console>
                    <LetterCount 
                        color={
                            (280-[letterCount])<=0 
                            ? "red" 
                            : (280-[letterCount])<=55 
                            ? "#FFE957" 
                            : "gray"}
                    >
                        {280-[letterCount]}
                    </LetterCount>
                    <Button 
                        type="submit" 
                        handleClick={handleClick}  
                        setPost={setPost} 
                        disabled={disabled}
                    >
                        Meow
                    </Button>
                </Console>
            </Form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
width: ${SIZES.mainPageSize};
border: 0.1px solid ${COLORS.lightgrey};
border-bottom: 10px solid ${COLORS.lightgrey};
display: flex;
* {
    /* border: 1px solid black; */
}; 
`;

const Avatar = styled.img`
width:40px; 
height:40px;
border-radius:50%;
margin: 10px;
`;

const Form = styled.form`
width:100%;
height: 200px;
position: relative;
`;

const Input = styled.textarea`
border:none;
height:100%;
width:100%;
resize: none;
&:focus, &:active {
    outline:none;
};
`;

const Console = styled.div`
display:flex;
position:absolute; 
right:0px; 
bottom: 0px;
`;

const LetterCount = styled.div`
color: ${({ color }) => color};
font-size:smaller;
display: flex;
align-items:center;
`;

export default PostTweet;