from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import math

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017")
db = client["cyberdb"]
collection = db["threats"]

def serialize(doc):
    doc['_id'] = str(doc['_id'])
    return doc

@app.route('/api/threats', methods=['GET'])
def get_threats():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    category = request.args.get('category')
    search = request.args.get('search')

    query = {}
    if category:
        query['Threat Category'] = category
    if search:
        query['Cleaned Threat Description'] = {"$regex": search, "$options": "i"}

    total = collection.count_documents(query)
    results = collection.find(query).skip((page - 1) * limit).limit(limit)
    threats = [serialize(doc) for doc in results]

    return jsonify({
        "total": total,
        "page": page,
        "pages": math.ceil(total / limit),
        "threats": threats
    })

@app.route('/api/threats/<id>', methods=['GET'])
def get_threat_by_id(id):
    try:
        threat = collection.find_one({"_id": ObjectId(id)})
        if not threat:
            return jsonify({"error": "Threat not found"}), 404
        return jsonify(serialize(threat))
    except:
        return jsonify({"error": "Invalid ID"}), 400

@app.route('/api/threats/stats', methods=['GET'])
def get_stats():
    total = collection.count_documents({})
    by_category = list(collection.aggregate([
        {"$group": {"_id": "$Threat Category", "count": {"$sum": 1}}}
    ]))
    by_severity = list(collection.aggregate([
        {"$group": {"_id": "$Severity Score", "count": {"$sum": 1}}}
    ]))
    return jsonify({
        "total": total,
        "by_category": by_category,
        "by_severity": by_severity
    })

if __name__ == '__main__':
    app.run(debug=True)
