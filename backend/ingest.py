import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["cyberdb"]
collection = db["threats"]

# Load the CSV file
df = pd.read_csv("../dataset/threats.csv")  # Make sure this path matches your file

# Convert and insert into MongoDB
data = df.to_dict(orient="records")
collection.insert_many(data)

print("✅ Data inserted successfully into MongoDB!")

