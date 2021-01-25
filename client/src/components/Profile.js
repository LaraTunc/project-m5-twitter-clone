import React , { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import PageTemplate from "./PageTemplate";
import { FiCalendar } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import SmallTweet from "./SmallTweet";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);
    const [profileFeed, setProfileFeed] = useState(null);
    const [status, setStatus] = useState("loading");
    const { sortArrayPerTimestamp } = useContext(CurrentUserContext);
    const [error, setError] = useState("");
    const [joinedDate, setJoinedDate] = useState(null); 

    useEffect(() => {
        fetch(`/api/${profileId}/profile`)
            .then((res) => {
                if(!res.ok) {
                    setError(true);
                }; 
                return res.json();
            })
            .then((json) => {
                setProfile(json.profile);
                const isoDate = json.profile.joined;
                const date = new Date(isoDate);
                const longdate = date.toLocaleDateString("en-US", {year: 'numeric', month: 'long'});
                setJoinedDate(longdate);
            });
        }, [profileId]);

    useEffect(() => {
        fetch(`/api/${profileId}/feed`)
            .then((res) => {
                if(!res.ok) {
                    setError(true);
                    console.log(res,profileId,"res");
                }; 
                return res.json();
            })
            .then((json) => {
                const profileFeedArrayUnsorted = Object.values(json.tweetsById); 
                sortArrayPerTimestamp(profileFeedArrayUnsorted);
                setProfileFeed(profileFeedArrayUnsorted);
            });
        }, [profileId, sortArrayPerTimestamp]);

    useEffect(()=>{
        if(profile && profileFeed) {
            setStatus("idle")
        };
    },[profile, profileFeed]);

    return (
        <PageTemplate status={status} error={error}>
            {profile &&
                <Wrapper> 
                    <Intro>
                        <Banner><img src={profile.bannerSrc} alt="user banner"/></Banner>
                        <Avatar src={profile.avatarSrc} alt="user avatar"/>
                        <Following><FollowingTab>{profile.isBeingFollowedByYou ? "Following" : "Follow"}</FollowingTab></Following>
                    </Intro>
                    <div><strong>{profile.displayName}</strong></div>
                    <User>@{profile.handle}
                        {profile.isFollowingYou && <div>Follows you</div>}
                    </User>
                    <div>{profile.bio}</div>
                    <Info>
                        <div><GoLocation/>{profile.location}</div> 
                        <div><FiCalendar/>Joined {joinedDate}</div>
                    </Info>
                    <FollowingACtivity>
                        <div><span>{profile.numFollowing}</span> Following</div>
                        <div><span>{profile.numFollowers}</span> Follower</div>
                    </FollowingACtivity>
                    <Content>
                            <SelectDiv>Tweets</SelectDiv>
                            <div>Media</div>
                            <div>Likes</div>
                    </Content>
                    {profileFeed && profileFeed.map((tweet)=>{
                        return (<SmallTweet key={tweet.id} tweet={tweet}/>)
                    })}
                </Wrapper>
            } 
        </PageTemplate>
    );
};

const Wrapper = styled.div`
border: 0.1px solid ${COLORS.lightgrey};
border-bottom: none;
`;

const Intro = styled.div` 
position: relative;
`;

const Banner = styled.div`
height: 200px;
& img {
    width:100%;
    max-height:100%;
    margin: 0px;
};
`;

const Avatar = styled.img`
width:130px; 
height:130px;
border: 2px solid white;
border-radius:50%;
position: absolute; 
bottom: -4px;
margin: 5px;
`;

const FollowingTab = styled.div`
background-color:${COLORS.primary};
padding: 8px 12px;
border-radius:25px;
color:white;
width: 100px;
text-align:center;
margin: 5px;
`;

const Following = styled.div`
display:flex; 
justify-content: flex-end;
`;

const User = styled.div`
display:flex;
align-items:center;
color:${COLORS.grey}; 
font-size:smaller;
margin: 5px 0px;
& div {
    background-color:${COLORS.lightgrey};
    font-size:smaller;
    border-radius:5px;
    padding: 0px 5px;
};
`;

const Info = styled.div`
display: flex;
align-items:center;
margin: 5px 0px;
& div {
    padding-right: 15px;
    color:${COLORS.grey};
}
`;

const FollowingACtivity = styled.div`
display: flex;
align-items:center;
margin: 5px 0px;
& div {
    padding-right: 10px;
    color:${COLORS.grey};
    margin:0px;
}
& span {
    color:black; 
    font-size: bolder;
};
`;

const Content = styled.div`
display: flex; 
border-bottom: 2px solid ${COLORS.lightgrey};
margin-top: 10px;
& div {
    flex:1;
    text-align:center;
    margin: 0px;
    font-weight:bolder;
};
`;

const SelectDiv = styled.div`
color:${COLORS.primary};
border-bottom: 2px solid ${COLORS.primary};
`;

export default Profile;