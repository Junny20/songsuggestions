import React from "react";
import BackButton from "../components/BackButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import clustersBarPlot from "../assets/clustersBarPlot.png";
import clustersTSNE from "../assets/twothousandsamples.png";
import visualizeRecommendations from "../assets/visualizeRecommendations.png";
import "../css/ModelAbout.css";

const codeString1 = `import numpy as np
import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt

from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.manifold import TSNE
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics import confusion_matrix`;

const codeString2 = `data = pd.read_csv("dataset.csv") #converts csv into pandas dataframe`;

const codeString3 = `print(data.iloc[0, :]) #prints first row of dataset`;
const outputString3 = `#                                        0
track_id            5SuOikwiRyPMVoIQDJUgSV
artists                        Gen Hoshino
album_name                          Comedy
track_name                          Comedy
popularity                              73
duration_ms                         230666
explicit                             False
danceability                         0.676
energy                               0.461
key                                      1
loudness                            -6.746
mode                                     0
speechiness                          0.143
acousticness                        0.0322
instrumentalness                  0.000001
liveness                             0.358
valence                              0.715
tempo                               87.917
time_signature                           4
track_genre                       acoustic
Name: 0, dtype: object`;

const codeString4 = `numeric_data = data.select_dtypes(np.number) #takes only the numeric columns in data

scaler = StandardScaler() #normalizes each series in numeric_data so that the mean is 0 and the stdev is 1.
numeric_data_scaled = scaler.fit_transform(numeric_data) #returns a nparray of shape (114000, 15)`;

const codeString5 = `CLUSTERS = 10 #initializes global cluster variable, avoids magic numbers

kmeans = KMeans(n_clusters=CLUSTERS, random_state = 42) 
#random_state fixes the cluster initialization so we get the same arrangements each time the model runs.

kmeans.fit(numeric_data_scaled) #now the model is fitted with the scaled data

list_of_clusters = kmeans.fit_predict(numeric_data_scaled) #numpy array of shape (114000,) representing song clusters
#this line looks through every vector of shape (15,) in numeric_data_scaled and returns a integer (0-9)
#corresponding to the cluster (closest cluster centroid) the vector is in`;

const codeString6 = `print(numeric_data_scaled[:5]) #prints first 5 vector in numeric_data_scaled
print(list_of_clusters[:5]) #prints corresponding clusters for each vector`;

const outputString6 = `[[-1.73203561  1.78262719  0.02457516  0.62924424 -0.71714792 -1.21044237
   0.30082834 -1.32628099  0.55184753 -0.85020151 -0.50410861  0.75874327
   0.92930586 -1.14186279  0.22182318]
 [-1.73200523  0.97563254 -0.73085898 -0.84590798 -1.88997974 -1.21044237
  -1.78474412  0.75398803 -0.07899331  1.8317324  -0.50409391 -0.59121068
  -0.79868969 -1.48971712  0.22182318]
 [-1.73197484  1.06529861 -0.16033174 -0.74218634 -1.12266943 -1.49134349
  -0.2932884   0.75398803 -0.27382571 -0.31549883 -0.50411187 -0.50716686
  -1.36568823 -1.528312    0.22182318]
 [-1.73194445  1.69296111 -0.24321364 -1.73330424 -2.31299433 -1.49134349
  -2.03925196  0.75398803 -0.45730865  1.7745932  -0.50388348 -0.42837577
  -1.27697417  1.98785885 -2.08967981]
 [-1.73191407  2.18612451 -0.27191895  0.29503007 -0.78871054 -0.92954125
  -0.28275019  0.75398803 -0.30314514  0.46339878 -0.50411187 -0.68628526
  -1.18440298 -0.07334821  0.22182318]]
[2 4 4 4 5]`;

const codeString7 = `data['cluster'] = list_of_clusters # Assigns each song in data to its cluster label`;

const codeString8 = `print(data.iloc[0, :])`;
const outputString8 = `#                                        0
track_id            5SuOikwiRyPMVoIQDJUgSV
artists                        Gen Hoshino
album_name                          Comedy
track_name                          Comedy
popularity                              73
duration_ms                         230666
explicit                             False
danceability                         0.676
energy                               0.461
key                                      1
loudness                            -6.746
mode                                     0
speechiness                          0.143
acousticness                        0.0322
instrumentalness                  0.000001
liveness                             0.358
valence                              0.715
tempo                               87.917
time_signature                           4
track_genre                       acoustic
cluster                                  2      # new column called cluster, with cluster 2 assigned
Name: 0, dtype: object`;

const codeString9 = `cluster_counts = data['cluster'].value_counts().sort_index()
print(cluster_counts)

plt.figure(figsize=(10, 6))
plt.bar(["Cluster 0", "Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4", "Cluster 5", "Cluster 6", "Cluster 7", "Cluster 8", "Cluster 9"], cluster_counts)
plt.xlabel("Cluster")
plt.ylabel("Number of Songs")
plt.title("Number of Songs per Cluster")
plt.show()`;

const outputString9 = `cluster
0     6851
1    16112
2    17259
3     6793
4    18232
5    19771
6    16349
7     1061
8     1079
9    10493
Name: count, dtype: int64`;

const codeString10 = `X = pd.DataFrame(numeric_data_scaled, columns=numeric_data.columns) 
#converts scaled data from nparray to pandas dataframe (as necessary for fitting data)

knn_model = NearestNeighbors(n_neighbors=6, metric='euclidean') 
#inits nearest neighbours model giving 6 nearest neighbours
knn_model.fit(X)`;

const codeString11 = `def recommend(song_index: int, top_n: int):
'''Takes the index of a song (song_index), and the desired number of DIFFERENT songs returned as arguments. 
Returns a dataframe containing the top recommended songs with columns of track name, artists, and track ID.'''

    song_vector = X.iloc[song_index].values.reshape(1, -1)

    distances, indices = knn_model.kneighbors(song_vector)
    #indices is a list with a list inside containing the song indexes of ALL recommended songs

    recommended_indices = indices[0][:top_n+1] 
    #we slice the indices list to only return top_n + 1 songs as the original song is always the 1st nearest neighbour

    recommended_songs = data.iloc[recommended_indices]
    #we locate the row of each song through indexing the pandas dataframe

    return recommended_songs[['track_name', 'artists', 'track_id']]
    #we only return the track_name, artists, and track_id column from each row`;

const outputString11 = `                             track_name  \
15     Falling in Love at a Coffee Shop   
2925                            La Luna   
582                          All We Are   
15485                  self destructive   
4699                  Salt In The Wound   
19804                          Breakups   

                                       artists                track_id  
15                                 Landon Pigg  1KHdq8NK9QxnGjdXb55NiG  
2925                          Conociendo Rusia  3AP3yFNoB0mdDh8DEaLCdL  
582                             Matt Nathanson  4SXcG6Ti32myNw9GJ9qeDt  
15485                                    Vorsa  4AL35ipeLY3R45DhAteP8H  
4699   Julien Baker;Phoebe Bridgers;Lucy Dacus  7blNhlXimy77PduXyWtmcI  
19804                                 Seaforth  77Bt2DXJE1R1qsnm4D10Ox `;

const visualiseRecs = `from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_flattened = pca.fit_transform(X)

def visualise_recommend(song_index, top_n = 5):
  song_vector = X.iloc[song_index].values.reshape(1, -1)

  song_cluster = data['cluster'][song_index]
  print(song_cluster)

  distances, indices = knn_model.kneighbors(song_vector)
  print(distances[0])

  recommended_indices = indices[0][:top_n+1]

  plt.figure(figsize=(8, 6))
  plt.scatter(X_flattened[:, 0], X_flattened[:, 1], alpha=0.3, color="gray", label="All Songs")

  print(recommended_indices)
  for i in recommended_indices[1:]:
      plt.scatter(X_flattened[i, 0], X_flattened[i, 1], color="blue", label="recommended songs")

  plt.scatter(X_flattened[song_index, 0], X_flattened[song_index, 1], color="red", label="Query song")

  plt.title("Song Recommendations (via PCA Projection)")
  plt.xlabel("PC1")
  plt.ylabel("PC2")
  plt.legend()
  plt.show()


print(visualise_recommend(15))`;

const visualiseRecsOutput = `5
[0.         0.05231263 0.05990601 0.07141953 0.07533749 0.08831706
 0.09399093 0.09510067 0.09625953 0.11055647 0.11366594 0.12212767
 0.12363904 0.12473208 0.12624503 0.12910023 0.13297227 0.13766637
 0.1432202  0.1537279 ]
[   15  2925  4699   582 15485 19804]`;

const visualiseClusters = `from sklearn.pipeline import Pipeline
from sklearn.manifold import TSNE

sample_indices = data.sample(5000, random_state=42).index
numeric_sample = numeric_data.loc[sample_indices]
info_sample = data.loc[sample_indices]

tsne_pipeline = Pipeline([('scaler', StandardScaler()), ('tsne', TSNE(n_components=2, verbose=1))])
genre_embedding = tsne_pipeline.fit_transform(numeric_sample)
projection = pd.DataFrame(columns=['x', 'y'], data=genre_embedding)
projection['genres'] = info_sample['track_genre'].values
projection['cluster'] = info_sample['cluster'].values

fig = px.scatter(
    projection, x='x', y='y', color='cluster', hover_data=['x', 'y', 'genres'])
fig.show()`;

const visualiseClustersOutput = `[t-SNE] Computing 91 nearest neighbors...
[t-SNE] Indexed 5000 samples in 0.009s...
[t-SNE] Computed neighbors for 5000 samples in 1.128s...
[t-SNE] Computed conditional probabilities for sample 1000 / 5000
[t-SNE] Computed conditional probabilities for sample 2000 / 5000
[t-SNE] Computed conditional probabilities for sample 3000 / 5000
[t-SNE] Computed conditional probabilities for sample 4000 / 5000
[t-SNE] Computed conditional probabilities for sample 5000 / 5000
[t-SNE] Mean sigma: 1.029338
[t-SNE] KL divergence after 250 iterations with early exaggeration: 83.989136
[t-SNE] KL divergence after 1000 iterations: 1.839226`;

const ModelAbout = () => {
  return (
    <div id="modelContainer">
      <h1>About our model:</h1>
      <p>
        Our model uses k-means to split the dataset into 10 clusters, then uses
        k-nearest neighbours to return the most similar songs from each cluster
        to the user.
      </p>
      <h2>Imports: </h2>
      <SyntaxHighlighter showLineNumbers>{codeString1}</SyntaxHighlighter>
      <p>Creating a pandas dataframe from raw csv data: </p>
      <SyntaxHighlighter showLineNumbers>{codeString2}</SyntaxHighlighter>
      <h3>Visualising our dataset: </h3>
      <p>Printing the first row of the dataset: </p>
      <SyntaxHighlighter showLineNumbers>{codeString3}</SyntaxHighlighter>
      <SyntaxHighlighter showLineNumbers>{outputString3}</SyntaxHighlighter>
      <h3>
        Scaling each feature of the dataset using{" "}
        <strong>Standard Scaler</strong>:
      </h3>
      <SyntaxHighlighter showLineNumbers>{codeString4}</SyntaxHighlighter>
      <h3>Why do we have to scale this data?</h3>
      <p>We have to because ...</p>

      <hr id="line"></hr>
      <h2>
        Part 1 - Structuring original dataset using{" "}
        <strong>K-Means clustering</strong>:
      </h2>
      <p>
        K-Means Clustering sorts songs in our dataset into clusters. Each song
        has a list of audio features, including valence, acousticness, tempo,
        energy, and key. Every song is given a number (0 - 9) that represents
        the cluster which best groups its audio features and audio features of
        similar songs.
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString5}</SyntaxHighlighter>
      <h3>Visualizing scaled numeric data and cluster data: </h3>
      <SyntaxHighlighter showLineNumbers>{codeString6}</SyntaxHighlighter>
      <SyntaxHighlighter showLineNumbers>{outputString6}</SyntaxHighlighter>
      <p>Adding a song's cluster to its data (structuring dataset)</p>
      <SyntaxHighlighter showLineNumbers>{codeString7}</SyntaxHighlighter>
      <h3>Visualizing the now structured dataset: </h3>
      <p>Printing the first row of the structured dataset:</p>
      <SyntaxHighlighter showLineNumbers>{codeString8}</SyntaxHighlighter>
      <SyntaxHighlighter showLineNumbers>{outputString8}</SyntaxHighlighter>
      <h3>Visualizing Cluster Data using matplotlib:</h3>
      <SyntaxHighlighter showLineNumbers>{codeString9}</SyntaxHighlighter>
      <SyntaxHighlighter showLineNumbers>{outputString9}</SyntaxHighlighter>
      <img src={clustersBarPlot} alt="bar plot of cluster numbers"></img>
      <h3>Visualizing Cluster Data using TSNE: </h3>
      <SyntaxHighlighter showLineNumbers>{visualiseClusters}</SyntaxHighlighter>
      <SyntaxHighlighter showLineNumbers>
        {visualiseClustersOutput}
      </SyntaxHighlighter>
      <img
        src={clustersTSNE}
        alt="TSNE and PCA Visualization of clusters"
      ></img>

      <h2>
        Part 2 - Taking user input and using{" "}
        <strong> K-Nearest-Neighbours (KNN) </strong> to return five songs from
        structured data:
      </h2>
      <h3>
        Preparing numeric_data_scaled to be refitted, and initializing a knn
        model:{" "}
      </h3>
      <SyntaxHighlighter showLineNumbers>{codeString10}</SyntaxHighlighter>
      <h3>
        Main <i>recommend(song_index: int, top_n: int)</i> function
      </h3>
      <p>
        The bulk of our app and search queries work with our 'recommend'
        function. This function takes the index of a song (song_index) and
        desired number of songs to return (top_n) as arguments. It collects the
        song's feature vector using song_index, and uses a{" "}
        <strong>K-Nearest-Neighbors model</strong> to locate the most similar
        songs in the dataset. It then returns a dataframe of recommended tracks.
      </p>
      <SyntaxHighlighter showLineNumbers>{codeString11}</SyntaxHighlighter>
      <h3>Sample output for function call of recommend(15)</h3>
      <SyntaxHighlighter showLineNumbers>{outputString11}</SyntaxHighlighter>
      <h2>Part 3 - Measuring Accuracy of our model: </h2>
      <p>Visualizing recommendations using PCA</p>
      <SyntaxHighlighter showLineNumbers>{visualiseRecs}</SyntaxHighlighter>
      <SyntaxHighlighter showLineNumbers>
        {visualiseRecsOutput}
      </SyntaxHighlighter>
      <img
        src={visualizeRecommendations}
        alt="visualizing recommendations using PCA"
      />
      <div>
        <BackButton path="/music" />
      </div>
    </div>
  );
};

export default ModelAbout;
