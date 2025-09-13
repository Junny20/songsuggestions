import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import list_of_song_names_and_ids from "../../songs.json";
import "../css/HomePage.css";
import LoadingPage from "../components/LoadingPage";
import Footer from "../components/Footer";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaDice } from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
import toTitleCase from "../functions/toTitleCase.js";
import randomPlaceholder from "../functions/randomPlaceholder.js";

function HomePage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [song, setSong] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState(randomPlaceholder());
  const [loading, setLoading] = useState(true);
  const [songIndexes, setSongIndexes] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchingForRecommendations, setSearchingForRecommendations] =
    useState(false);
  const [showRecommendationContainer, setShowRecommendationContainer] =
    useState(true);
  const [showDropdown, setShowDropdown] = useState(true);
  const list_of_songs = list_of_song_names_and_ids["names"];
  const list_of_artists = list_of_song_names_and_ids["artists"];

  const navigate = useNavigate();

  let list_of_songs_and_artists = [];

  for (var i = 0; i < list_of_songs.length; i++) {
    list_of_songs_and_artists.push(
      `${list_of_songs[i]} - ${list_of_artists[i]}`
    );
  }

  const handleUsername = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.error("No access token available. Guest mode activated.");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        const errorText = response.text();
        throw new Error(`Spotify API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setUsername(data.display_name || null);
      setProfile(data.images || []);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setLoading(false);
    }
  };

  const smartSearch = (s) => {
    if (showRecommendationContainer) {
      setShowRecommendationContainer((prevValue) => !prevValue);
    }

    if (s.length > 3) {
      const filtered_list_of_song_name_and_artist_name =
        list_of_songs_and_artists.filter((e) => {
          const song = e.toLowerCase();
          const artists = e.split("-")[1].trim();
          const list_of_artists = artists.split(";");
          const possible_searches = [song, ...list_of_artists];

          return possible_searches.some(
            (e) => e.toLowerCase().slice(0, s.length) === s.toLowerCase()
          );
        });

      const unique_filtered_song_and_artist_list = [
        ...new Set(filtered_list_of_song_name_and_artist_name),
      ];

      console.log(unique_filtered_song_and_artist_list);

      const filtered_list_of_song_names =
        unique_filtered_song_and_artist_list.map((e) => {
          const index = list_of_songs_and_artists.indexOf(e);
          return list_of_songs[index];
        });

      const filtered_list_of_song_indexes = filtered_list_of_song_names.map(
        (element) => list_of_songs.indexOf(element)
      );

      setSongIndexes(filtered_list_of_song_indexes);
    } else {
      setSongIndexes([]);
    }
  };

  const handleSearch = async (e, s) => {
    e.preventDefault();

    setSearchingForRecommendations(true);
    setShowDropdown(false);

    if (!s) {
      return;
    }

    setSong(s);

    const index = list_of_songs.indexOf(s);
    console.log(index);

    if (index === -1) {
      console.log("Song not found. Check spelling and try again?");
      setSearchingForRecommendations(false);
      setSong("");
      setInputPlaceholder("Song not found. Check spelling and try again?");
      if (showRecommendationContainer) {
        setShowRecommendationContainer((prevValue) => !prevValue);
      }
      return;
    }

    try {
      const res = await fetch(
        `https://musicrecommender-production.up.railway.app/generate-playlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ index: index }),
        }
      );

      const data = await res.json();
      setPlaylist(data.playlist);

      setShowRecommendationContainer(true);
    } catch (error) {
      console.log("Error: ", error);
    }

    setSearchingForRecommendations(false);
    setShowDropdown(true);
    setSongIndexes([]);
    setInputPlaceholder(randomPlaceholder());
  };

  const handleRandom = (e) => {
    const randomSongIndex = Math.floor(Math.random() * list_of_songs.length);
    const randomSong = list_of_songs[randomSongIndex];
    handleSearch(e, randomSong);
    setInputPlaceholder(randomPlaceholder());
  };

  const handleChange = (e) => {
    const song = e.target.value;
    setSong(song);
  };

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    smartSearch(song);
  }, [song]);

  useEffect(() => {
    handleUsername();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div>
        <div id="musicRecommenderContainer">
          {username ? <h2>Hi, {username}!</h2> : <h2>Hi there!</h2>}
          <div id="formDropdownRecommendationContainer">
            <div id="formDropdownContainer">
              <div id="searchSongContainer">
                <form id="songForm">
                  <input
                    id="songInput"
                    onChange={handleChange}
                    placeholder={inputPlaceholder}
                    value={song}
                  ></input>
                  <button
                    id="submitButton"
                    onClick={(e) => {
                      handleSearch(e, toTitleCase(song));
                    }}
                  >
                    <HiMagnifyingGlass id="searchIcon" />
                  </button>
                  <button id="randomizeButton" onClick={handleRandom}>
                    <FaDice id="diceIcon" />
                  </button>
                  <button id="backButton" onClick={handleBack}>
                    <FaBackward id="backIcon" />
                  </button>
                </form>
              </div>
              {showDropdown && (
                <div id="searchResultContainer">
                  {songIndexes && (
                    <div id="songContainer">
                      {songIndexes.map((element, index) => (
                        <button
                          key={index}
                          className="dropdown-btn"
                          onClick={(e) => {
                            const song = list_of_songs[element];
                            handleSearch(e, song);
                          }}
                        >
                          {list_of_songs[element]} - {list_of_artists[element]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {showRecommendationContainer &&
              playlist &&
              (!searchingForRecommendations ? (
                <div>
                  <div id="firstSongComponent">
                    {playlist[0].track_id && (
                      <iframe
                        className="songFrame"
                        src={`https://open.spotify.com/embed/track/${playlist[0].track_id}`}
                      ></iframe>
                    )}
                  </div>

                  <p id="queryText">Check out these songs!</p>

                  <div id="songRecommendationContainer">
                    {playlist.slice(1).map((song_details, index) => {
                      return (
                        <div key={index} id={`otherSongComponent${index}`}>
                          {song_details.track_id && (
                            <iframe
                              className="songFrame"
                              src={`https://open.spotify.com/embed/track/${song_details.track_id}`}
                            ></iframe>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              ))}
          </div>
          {profile && profile[0] && (
            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img src={profile[0].url} id="profileImage" />
            </button>
          )}
        </div>
      </div>
      <hr id="homeHR" color="#D4A373"></hr>
      <Footer />
    </div>
  );
}

export default HomePage;
