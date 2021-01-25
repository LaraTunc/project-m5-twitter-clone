import React, { useContext } from "react"; 
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import GlobalStyles from "./GlobalStyles";
import { CurrentUserContext } from "./CurrentUserContext";
import Error from "./Error";
import Loading from "./Loading";

const App = () => {
  const { status, error } = useContext(CurrentUserContext);
  return (
      <BrowserRouter>
      <GlobalStyles/>
        <div>
          { error 
          ? (<Error>error</Error>) 
          : status === "loading" 
          ? (<Loading/>)
          : (
            <Switch> 
            <Route exact path="/">
              <HomeFeed/>
            </Route>
            <Route exact path="/notifications">
              <Notifications/>
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks/>
            </Route>
            <Route exact path="/tweet/:tweetId">
              <TweetDetails/>
            </Route>
            <Route exact path="/:profileId">
              <Profile/>
            </Route>
          </Switch>
          ) }
        </div>
      </BrowserRouter>
  );
};

export default App;
