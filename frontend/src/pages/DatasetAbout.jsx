import React from "react";
import "../css/DatasetAbout.css";
import dataImage from "../assets/data_image.png";
import dataExample from "../assets/data_example.png";
import BackButton from "../components/BackButton";

const DatasetAbout = () => {
  return (
    <div id="dataPageContainer">
      <div id="dataHeaderContainer">
        <img id="dataImage" src={dataImage} />
        <div id="TitleAndDesc">
          <h1 id="header">About the Spotify Tracks Dataset</h1>
          <p>
            This dataset contains Spotify tracks across 125 different genres,
            with each track accompanied by a variety of audio features. The data
            is in CSV format, making it easy to load and work with.
          </p>
        </div>
      </div>

      <div id="usageAndIncludedContainer">
        <div id="includedContainer">
          <h2 id="usageTitle">What's included</h2>
          <p id="subhead">Track details</p>
          <ul id="usageList">
            <li>
              <b>track_id:</b> The unique Spotify ID for each track
            </li>
            <li>
              <b>artists:</b> Names of the performing artists (multiple artists
              are separated by “;”)
            </li>
            <li>
              <b>album_name:</b> The album that features the track
            </li>
            <li>
              <b>track_name:</b> The name of the track
            </li>
            <li>
              <b>track_genre:</b> Genre of the track
            </li>
            <li>
              <b>popularity:</b> A score from 0 to 100 that reflects how popular
              the track is, based on plays and recency
            </li>
          </ul>

          <p id="subhead">Track attributes</p>
          <ul id="usageList">
            <li>
              <b>duration_ms:</b> Track length in milliseconds
            </li>
            <li>
              <b>explicit:</b> Indicates whether the track contains explicit
              lyrics
            </li>
            <li>
              <b>danceability:</b> How suitable the track is for dancing (0.0 =
              least danceable, 1.0 = most danceable)
            </li>
            <li>
              <b>energy:</b> Measures the intensity and activity of a track (0.0
              = calm, 1.0 = highly energetic)
            </li>
            <li>
              <b>key:</b> The musical key of the track (0 = C, 1 = C♯/D♭, etc.;
              -1 if undetected)
            </li>
            <li>
              <b>loudness:</b> Overall track volume in decibels
            </li>
            <li>
              <b>mode:</b> Major (1) or minor (0) key
            </li>
            <li>
              <b>speechiness:</b> How much the track contains spoken words
              (e.g., podcasts, rap, or regular songs)
            </li>
            <li>
              <b>acousticness:</b> Likelihood of the track being acoustic
              (measure from 0.0 to 1.0, which represents high confidence)
            </li>
            <li>
              <b>instrumentalness:</b> Probability that the track has no vocals
              (measure from 0.0 to 1.0, which represents high confidence)
            </li>
            <li>
              <b>liveness:</b> Likelihood of a live audience being present
              during recording
            </li>
            <li>
              <b>valence:</b> The positivity of the track (0.0 = sad or angry,
              1.0 = happy or cheerful)
            </li>
            <li>
              <b>tempo:</b> Speed of the track in beats per minute (BPM)
            </li>
            <li>
              <b>time_signature:</b> Number of beats per measure (3 to 7)
            </li>
          </ul>
        </div>

        <div id="usageContainer">
          <h2 id="usageTitle">Usage</h2>
          <ul id="usageList">
            <li>
              Build music recommendation systems based on user preferences
            </li>
            <li>Classify tracks by genre using their audio features</li>
            <li>Explore other creative applications involving music data</li>
          </ul>
        </div>

        <div id="dataExampleContainer">
          <img id="dataExample" src={dataExample} />
        </div>
      </div>
      <BackButton path="/music" />
    </div>
  );
};

export default DatasetAbout;
