from flask import Flask, request, url_for, session, redirect, jsonify
import time
import requests
from credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI

from flask_cors import CORS
from model.model import recommend

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["https://songsuggestions.vercel.app"], methods=["GET", "POST"])

@app.route('/generate-playlist', methods=["POST"])
def generate_playlist():
    try:
        data = request.get_json()
        index = data.get("index")
    
        if not index:
            return jsonify({"error": "No index provided"}), 400
        
        df = recommend(index)

        result = df.to_dict(orient="records")

        #print(result)

        return jsonify({"playlist": result})
    
    except Exception as e:
        print(e)
        return jsonify({"error": f"Error: {e}"}), 500

app.config.update(
    SESSION_COOKIE_SAMESITE="None",  # allow cross-site
    SESSION_COOKIE_SECURE=False,     # in dev you can keep False
)

@app.route("/redirectPage")
def redirectPage():
    code = request.args.get("code")
    if not code:
        return "No code received", 400

    token_url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    response = requests.post(token_url, data=payload)
    if response.status_code != 200:
        return f"Failed to get token: {response.text}", 400

    token_info = response.json() 

    access_token = token_info["access_token"]
    refresh_token = token_info.get("refresh_token", "")
    expires_in = token_info["expires_in"]

    frontend_url = (
        f"https://songsuggestions.vercel.app/callback?"
        f"access_token={access_token}&refresh_token={refresh_token}&expires_in={expires_in}"
    )

    return redirect(frontend_url)

if __name__ == "__main__":
    app.run()