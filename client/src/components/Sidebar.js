import React , { useContext } from "react"; 
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { FiHome } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { COLORS } from "../constants";
import Button from "./Button";
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = ()=> {
    const { currentUser } = useContext(CurrentUserContext);
    const profileId = currentUser.profile.handle;
    return (
        <Wrapper> 
            <Logo style={{width: "20%", height: "30%", margin: "10px"}}/>
            <ul>
                <li>
                    <StyledLink to="/"><div><FiHome/></div>Home</StyledLink>
                </li>
                <li>
                    <StyledLink to={`/${profileId}`}><div><FiUser/></div>Profile</StyledLink>
                </li>
                <li>
                    <StyledLink to="/notifications"><div><FiBell/></div>Notifications</StyledLink>
                </li>
                <li>
                    <StyledLink to="/bookmarks"><div><FiBookmark/></div>Bookmarks</StyledLink>
                </li>
            </ul>
            <Button fontSize={"20px"}>Meow</Button>
        </Wrapper>
    );
}; 

const Wrapper = styled.div`
display: flex; 
flex-direction:column; 
padding: 10px;
max-width:200px;
`;

const StyledLink = styled(NavLink)`
font-size:20px;
display: flex; 
align-items:center;
text-decoration:none; 
border-radius:17px;
margin: 10px;
padding: 5px;
color:black;
&.active {
    color: ${COLORS.primary};
};
&:hover { 
    background-color: ${COLORS.lightPurple };
    color: ${COLORS.primary};
}
& div {
    display: flex; 
    align-items:center;
    margin: 5px;
};
&:focus {
    outline: none;
    box-shadow: 0px 0px 7px 3px ${COLORS.blue};
    };
`

export default Sidebar; 