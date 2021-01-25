import React, { useEffect, useState } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => {
        if (!res.ok) {
          setError(true);
        }
        return res.json();
      })
      .then((json) => {
        setCurrentUser(json);
        setStatus("idle");
      });
  }, []);

  const sortArrayPerTimestamp = (array) => {
    array.sort((a, b) => {
      return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
    });
  };

  const handleClickLike = (ev, tweetId, state, setState) => {
    ev.stopPropagation();

    fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      body: JSON.stringify({ like: !state }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setState(!state);
      });
  };

  const handleClickRetweet = (ev, tweetId, state, setState) => {
    ev.stopPropagation();

    fetch(`/api/tweet/${tweetId}/retweet`, {
      method: "PUT",
      body: JSON.stringify({ retweet: !state }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setState(!state);
      });
  };

  return (
    <CurrentUserContext.Provider
        value={{
            currentUser,
            status,
            sortArrayPerTimestamp,
            error,
            handleClickLike,
            handleClickRetweet,
        }}
    >
        {children}
    </CurrentUserContext.Provider>
  );
};
