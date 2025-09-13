import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "../css/ProjectDocumentation.css";
import spinningRecord from "../assets/spinning_record.png";
import audioWaves from "../assets/audio.png";
import BackButton from "../components/BackButton";

const bashString = `bash
git clone https://github.com/username/spotify-app.git
cd spotify-app`;
const installString = `npm install   # frontend
pip install -r requirements.txt   # backend`;
const envString = `CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI="https://musicrecommender-production.up.railway.app/redirectPage"`;
const runString = `npm run dev   # frontend
flask run     # backend`;

const ProjectDocumentation = () => {
  return (
    <div>
      <div id="projDocumentationContainer">
        <div id="documentationHeader">
          <h1 id="documentationTitle">Project Documentation</h1>
          <p id="docuSummary">
            <b>Objective:</b> A web app that leverages a KNN model to suggest
            songs based on user input. Users can search for a song they like,
            and the app will provide a list of recommended tracks that align
            with the song's attributes.
          </p>
        </div>
        <div id="container1">
          <div id="featuresContainer">
            <h2 id="featuresHeader">Features</h2>
            <ul id="featuresList">
              <li id="feature">
                <b>Spotify Login</b> - Secure login via Spotify OAuth
              </li>
              <li id="feature">
                <b>Song Search</b> – Search tracks, artists, or albums
              </li>
              <li id="feature">
                <b>Song Recommendation</b> - Recommend songs based on the
                searched song
              </li>
              <li id="feature">
                <b>User Stats</b> – View username, number of followers, and top
                tracks
              </li>
              <li id="feature">
                <b>Interactive UI</b> – Clean and responsive design with React
              </li>
            </ul>
          </div>
          <div id="hoverContainer">
            <a
              target="_blank"
              href={"https://open.spotify.com/playlist/37i9dQZF1F3songotheday"}
            >
              <img id="spinningRecord" src={spinningRecord} />
            </a>
            <span id="hoverText">Click to play the Song of the Day!</span>
          </div>
          <div id="featuresContainer">
            <h2 id="featuresHeader">Tech Stack</h2>
            <ul id="featuresList">
              <li>Frontend: React, Vite, CSS</li>
              <li>Backend: Flask (Python)</li>
              <li>API: Spotify Web API (Authorization Code Flow)</li>
              <li>Data Visualization: Numpy, Matplotlib, Pandas</li>
              <li>Machine Learning: Scikit Learn, Tensorflow</li>
              <li>Deployment: Vercel</li>
            </ul>
          </div>
        </div>
        <div id="container2">
          <div id="setupContainer">
            <h2 id="featuresHeader">Setup & Installation</h2>
            <p id="steps">
              <b>1. Clone the Repository</b>
            </p>
            <SyntaxHighlighter id="codeLine" showLineNumbers>
              {bashString}
            </SyntaxHighlighter>
            <p id="steps">
              <b>2. Install Dependencies</b>
            </p>
            <SyntaxHighlighter id="codeLine" showLineNumbers>
              {installString}
            </SyntaxHighlighter>
            <p id="steps">
              <b>3. Set Environment Variables</b>
            </p>
            <p id="steps">Edit the credentials.py file with: </p>
            <SyntaxHighlighter id="codeLine" showLineNumbers>
              {envString}
            </SyntaxHighlighter>
            <p id="steps">
              <b>4. Run app</b>
            </p>
            <SyntaxHighlighter id="codeLine" showLineNumbers>
              {runString}
            </SyntaxHighlighter>
          </div>
          <div id="container3">
            <div id="featuresContainer">
              <h2 id="featuresHeader">Future Improvements</h2>
              <ul id="conclusionList">
                <li>
                  Expand our dataset to include more songs for better
                  recommendations (currenly using a dataset of ~114k songs)
                </li>
                <li>Add playlist creation</li>
                <li>Improve the GUI and make it more user-friendly</li>
              </ul>
            </div>
            <img id="audioWaves" src={audioWaves} />
            <div id="featuresContainer">
              <h2 id="featuresHeader">Thought Process</h2>
              <p>
                <b>Problem Statement:</b> How can we enable users to discover
                new music that reflects their personal preferences, even when
                their chosen platform has not yet developed an accurate
                recommendation algorithm for them?
              </p>
              <p>
                <b>Solution:</b> Build a web app that uses a KNN model to
                recommend songs based on the provided song's attributes. The app
                will allow users to search for a song they like and receive a
                list of recommended tracks that align with the song's
                characteristics.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BackButton path="/music" />
      </div>
    </div>
  );
};

export default ProjectDocumentation;
