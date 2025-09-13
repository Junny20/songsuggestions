import React from "react";
import "../css/ApiCallsAbout.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import BackButton from "../components/BackButton.jsx";

const codeString1 = `const CLIENT_ID = "861f53578117423ab511f505b74d214d";
const SCOPES = "user-top-read";
const REDIRECT_URI = "http://127.0.0.1:5000/redirectPage"; //handled through our flask backend

const handleLogin = () => {
  const authUrl = \`https://accounts.spotify.com/authorize?client_id=\${CLIENT_ID}&response_type=code&redirect_uri=\${encodeURIComponent(
    REDIRECT_URI
  )}&scope=\${encodeURIComponent(SCOPES)}\`;

  window.location.href = authUrl; //directing user to authUrl
};`;

const codeString2 = `@app.route("/redirectPage")
def redirectPage():
    code = request.args.get("code") #gets the authorization code from Spotify API
    if not code: #in event auth request succeeded but Spotify API did not pass a code
        return "No code received", 400`;

const codeString3 = `    token_url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,

        response = requests.post(token_url, data=payload) #returns a response Object
        if response.status_code != 200: 
            return f"Failed to get token: {response.text}", 400 #early return in event of failed token request

        token_info = response.json() #parses response.text (python string) into python dict, much easier to work with
    }`;

const tokenExample = `{
  "access_token": "<ACCESS_TOKEN>",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "<REFRESH_TOKEN>",
  "scope": "user-top-read"
}`;

const codeString4 = `    access_token = token_info["access_token"]
    refresh_token = token_info.get("refresh_token", "") #in the case refresh_token is missing this won't throw an error
    expires_in = token_info["expires_in"]

    frontend_url = (
        f"http://localhost:5173/callback?"
        f"access_token={access_token}&refresh_token={refresh_token}&expires_in={expires_in}"
    ) #passes all values as query params

    return redirect(frontend_url)`;

const codeString5 = `  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); //javascript method to parse query parameters from the url
    //this returns a URLSearchParams Object

    const access_token = urlParams.get("access_token"); #retrieves params from the URLSearchParams Object
    const refresh_token = urlParams.get("refresh_token");
    const expires_in = urlParams.get("expires_in");

    if (access_token) {
      console.log("Access Token:", access_token); //for developer clarity and displayed in browser console
      console.log("Refresh Token:", refresh_token);
      console.log("Expires in:", expires_in);

      localStorage.setItem("access_token", access_token); //sets each param in browser storage
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in);

      navigate("/music"); 
    
    //successful auth flow and user data displays in /music page

    } else if (window.location.search.includes("access_token")) {
      console.error("Access token param exists but is invalid or missing output!");
      navigate("/music"); 

    //event that there is an access token param but no access token - user continues as guest

    } else {
      console.error("Access token param does not exist!");
      navigate("/music")
    } 

    //event that there is no access token param - in theory this should never happen as backend early returns if response status code is not 200
  }, []);`;

const codeString6 = `try {
      const res = await fetch("/api/generate-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: index }),
      });

      const data = await res.json();
      setPlaylist(data.playlist);

      setShowRecommendationContainer(true);
    } catch (error) {
      console.log("Error: ", error);
    }`;

const modelOutput = `[
  {
    track_name: "Ego Death (feat. Kanye West, FKA twigs & Skrillex)",
    artists: "Ty Dolla $ign;FKA twigs;Skrillex;Kanye West",
    track_id: "3Q5cLvkKsHJvYltf8k7HkO",
  },
  {
    track_name: "slow down my thoughts",
    artists: "Zachary Knowles",
    track_id: "6NU3w0CtU7g9boAarIAkO4",
  },
  {
    track_name: "Lumbre",
    artists: "Sharif;Gordo del Funk;Charles Ans",
    track_id: "4hCljizRieqMfwID8yAwca",
  },
  {
    track_name: "Te Quedó Grande la Yegua",
    artists: "Natalia Jiménez",
    track_id: "1vh6wqGiwMmedaJGD5aT4o",
  }
];`;

const APICallsAbout = () => {
  return (
    <div id="apiCallsAboutContainer">
      <h1>API Calls: </h1>
      <h2>How our API Calls are structured: </h2>
      <p>
        We work with Spotify API for all of our API calls. Users that are
        authorised, i.e have access to our Spotify Developer App, are able to
        sign in and have their user data displayed in the main page and other
        pages.
      </p>
      <hr id="line"></hr>
      <h2>Auth Flow with Spotify API: </h2>
      <h3>Building the Authentication request: </h3>
      <p>
        On the start page there is a button to sign in with spotify. On button
        click, the frontend builds an authUrl containing our client ID, redirect
        URI (where Spotify API will redirect us after completion of this auth
        request), and scope (what our dev app can and can't access within a
        user's profile).
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString1}</SyntaxHighlighter>
      <h3>On completion of the Authentication request: </h3>
      <p>
        We have successfully made an auth request to Spotify's auth page.
        Spotify's API then redirects us to our redirect URI
        ("http://127.0.0.1:5000/redirectPage" in dev mode) with an{" "}
        <strong>authorization code appended</strong>! This is the key to
        handling in our backend.
      </p>
      <h3>Explaining our backend routing: </h3>
      <p>
        Part 1: Extracting the authorization code after the successful auth
        request.
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString2}</SyntaxHighlighter>
      <p>
        Part 2: We then exchange this code for Spotify's{" "}
        <strong>access tokens</strong> which are <strong>mandatory</strong> to
        fetch Spotify user data from Spotify API. To get these tokens, we pass
        in a payload containing parameters of <i>grant_type</i>, <i>code</i>,{" "}
        <i>redirect_uri</i>, <i>client_id</i>, and <i>client_secret</i> to the
        Spotify Token API endpoint. We store the response in a variable called
        token_info.
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString3}</SyntaxHighlighter>
      <p>
        Example <i>token_info</i> output
      </p>
      <SyntaxHighlighter showLineNumbers>{tokenExample}</SyntaxHighlighter>
      <p>
        Part 3: After a successful token response, we send the <i>token_info</i>{" "}
        variable back to our React frontend. We build the redirect url{" "}
        <i>frontend_url</i> by attaching the query params <i>access_token</i>,{" "}
        <i>refresh_token</i> (if it exists), and the <i>expires_in</i> time
        variable. We then call Flask's redirect function to send a https
        response to our Vite frontend server running on port 5173.
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString4}</SyntaxHighlighter>
      <h3>
        Explaining our frontend Callback url{" "}
        <i>http://localhost:5173/callback</i>:{" "}
      </h3>
      <p>
        Once flask redirects to our callback, our React <i>Callback.jsx</i> page
        loads. The bulk of this component is a <strong>useEffect hook</strong>{" "}
        with an <strong>empty dependency array</strong>. On initial component
        load, our useEffect hook is called once and never again. We aim to store
        our <i>access_token</i> and <i>refresh_token</i> in{" "}
        <strong>browser local storage</strong>. Regardless of whether the tokens
        are successfully fetched or stored, the user is automatically redirected
        to the /music page to continue using the app. In event that the
        access_token cannot be fetched, the user simply uses our pages as a
        guest (their spotify username will be replaced with a generic welcome
        message and their spotify profile will not display in the top right).
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString5}</SyntaxHighlighter>

      <hr id="line"></hr>
      <h2>How our frontend pages are routed: </h2>
      <p>
        We route pages natively in frontend using React Router and React Router
        DOM. Each page is defined as a route in our <code>&lt;Routes&gt;</code>{" "}
        component, and we navigate programmatically using the{" "}
        <code>useNavigate</code> hook. This allows us to redirect the user
        without <strong>refreshing the browser</strong> each time.
      </p>
      <h2>How our app is deployed: </h2>
      <p>
        Our React frontend is deployed using Vercel and our backend is deployed
        separately using Railway. We connect our API Calls to our backend using
        a redirect URI.
      </p>
      <BackButton path="/music" />
    </div>
  );
};

export default APICallsAbout;
