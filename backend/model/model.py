import numpy as np
import pandas as pd
import os

from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "dataset.csv")

data = pd.read_csv(csv_path)

CLUSTERS = 10

numeric_data = data.select_dtypes(np.number)

#X = pd.DataFrame(numeric_data_scaled, columns=numeric_data.columns)
X = numeric_data

def recommend(song_index, top_n=10):
     knn_model = NearestNeighbors(n_neighbors=15, metric='euclidean')  
     knn_model.fit(X)

     song_vector = X.iloc[song_index].values.reshape(1, -1) #reshapes from 1D to 2D list
     print(song_vector)

     distances, indices = knn_model.kneighbors(song_vector)

     recommended_indices = []
     seen_track_name_set = set()

     for i in indices[0]:
          track_name = data.iloc[i]['track_name'].lower()
          
          if track_name not in seen_track_name_set:
               recommended_indices.append(i)
               seen_track_name_set.add(track_name)
          if len(recommended_indices) > top_n:
               break

     recommended_songs = data.iloc[recommended_indices]

     return recommended_songs[['track_name', 'artists', 'track_id']]