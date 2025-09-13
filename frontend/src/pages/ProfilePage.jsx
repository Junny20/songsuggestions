import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import "../css/ProfilePage.css";
import BackButton from "../components/BackButton";

const ProfilePage = () => {
  const [username, setUsername] = useState(null);
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [songs, setSongs] = useState(null);

  const userInfo = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.error("No access token available. Log in first.");
      return;
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status != 200) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      setUsername(data.display_name);
      setInfo(data.followers);
      setImage(data.images);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const topSongs = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.error("No access token available. Log in first.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5&offset=0",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status != 200) {
        throw new Error("Failed to fetch user info");
      }

      const tracks = await response.json();
      setSongs(tracks.items);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    userInfo();
    topSongs();
  }, []);

  return (
    <div id="Profile Container">
      <div id="imageAndUserContainer">
        {image && image[0] && <img src={image[0].url} id="image" />}
        <div id="userInfoContainer">
          {username && <h1 id="username">{username}</h1>}
          {info && <h3 id="followers">{info.total} Followers</h3>}
        </div>
      </div>

      <div id="topTracksContainer">
        <h2 id="topSongsHead">Top tracks this month</h2>
        <div id="songContainer2">
          {songs &&
            songs.map((song, index) => {
              return (
                <div key={index} className="songPictureAndName">
                  <a
                    href={song.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="songLink"
                  >
                    {<img id="song" src={song.album.images[0].url}></img>}
                  </a>
                  <b>{song.name}</b>
                </div>
              );
            })}
        </div>
      </div>
      <BackButton path="/music" />
    </div>
  );
};

export default ProfilePage;
