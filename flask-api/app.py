from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models and scalers once at startup
diabetes_model = joblib.load('models/diabetes_model.pkl')
diabetes_scaler = joblib.load('models/diabetes_scaler.pkl')

heart_model = joblib.load('models/heart_model.pkl')
heart_scaler = joblib.load('models/heart_scaler.pkl')

print("Models loaded successfully!")

DIABETES_FIELDS = [
    'HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker', 'Stroke',
    'HeartDiseaseorAttack', 'PhysActivity', 'Fruits', 'Veggies',
    'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost', 'GenHlth',
    'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
]

HEART_FIELDS = [
    'HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker', 'Stroke',
    'Diabetes', 'PhysActivity', 'Fruits', 'Veggies',
    'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost', 'GenHlth',
    'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
]


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Flask API is running"})


@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.get_json()

    if data is None:
        return jsonify({"error": "No JSON body received"}), 400

    missing = [f for f in DIABETES_FIELDS if f not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {missing}"}), 400

    try:
        features = np.array([[float(data[f]) for f in DIABETES_FIELDS]])
    except (ValueError, TypeError):
        return jsonify({"error": "All fields must be numeric"}), 400

    features_scaled = diabetes_scaler.transform(features)
    probability = diabetes_model.predict_proba(features_scaled)[0][1]
    prediction = 1 if probability >= 0.3 else 0
    category = "High Risk" if prediction == 1 else "Low Risk"

    return jsonify({
        "prediction": int(prediction),
        "probability": round(float(probability), 4),
        "category": category
    })


@app.route('/predict/heart', methods=['POST'])
def predict_heart():
    data = request.get_json()

    if data is None:
        return jsonify({"error": "No JSON body received"}), 400

    missing = [f for f in HEART_FIELDS if f not in data]
    if missing:
        return jsonify({"error": f"Missing required fields: {missing}"}), 400

    try:
        features = np.array([[float(data[f]) for f in HEART_FIELDS]])
    except (ValueError, TypeError):
        return jsonify({"error": "All fields must be numeric"}), 400

    features_scaled = heart_scaler.transform(features)
    probability = heart_model.predict_proba(features_scaled)[0][1]
    prediction = 1 if probability >= 0.3 else 0
    category = "High Risk" if prediction == 1 else "Low Risk"

    return jsonify({
        "prediction": int(prediction),
        "probability": round(float(probability), 4),
        "category": category
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000)































# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# # Load models and scalers once at startup
# diabetes_model = joblib.load('models/diabetes_model.pkl')
# diabetes_scaler = joblib.load('models/diabetes_scaler.pkl')

# heart_model = joblib.load('models/heart_model.pkl')
# heart_scaler = joblib.load('models/heart_scaler.pkl')

# print("Models loaded successfully!")


# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({"status": "ok", "message": "Flask API is running"})


# @app.route('/predict/diabetes', methods=['POST'])
# def predict_diabetes():
#     data = request.get_json()

#     # Expecting 21 features in the exact order the model was trained on
#     features = np.array([[
#         data['HighBP'], data['HighChol'], data['CholCheck'], data['BMI'],
#         data['Smoker'], data['Stroke'], data['HeartDiseaseorAttack'],
#         data['PhysActivity'], data['Fruits'], data['Veggies'],
#         data['HvyAlcoholConsump'], data['AnyHealthcare'], data['NoDocbcCost'],
#         data['GenHlth'], data['MentHlth'], data['PhysHlth'], data['DiffWalk'],
#         data['Sex'], data['Age'], data['Education'], data['Income']
#     ]])

#     features_scaled = diabetes_scaler.transform(features)
#     probability = diabetes_model.predict_proba(features_scaled)[0][1]
#     prediction = 1 if probability >= 0.3 else 0

#     category = "High Risk" if prediction == 1 else "Low Risk"

#     return jsonify({
#         "prediction": int(prediction),
#         "probability": round(float(probability), 4),
#         "category": category
#     })


# @app.route('/predict/heart', methods=['POST'])
# def predict_heart():
#     data = request.get_json()

#     features = np.array([[
#         data['HighBP'], data['HighChol'], data['CholCheck'], data['BMI'],
#         data['Smoker'], data['Stroke'], data['Diabetes'],
#         data['PhysActivity'], data['Fruits'], data['Veggies'],
#         data['HvyAlcoholConsump'], data['AnyHealthcare'], data['NoDocbcCost'],
#         data['GenHlth'], data['MentHlth'], data['PhysHlth'], data['DiffWalk'],
#         data['Sex'], data['Age'], data['Education'], data['Income']
#     ]])

#     features_scaled = heart_scaler.transform(features)
#     probability = heart_model.predict_proba(features_scaled)[0][1]
#     prediction = 1 if probability >= 0.3 else 0

#     category = "High Risk" if prediction == 1 else "Low Risk"

#     return jsonify({
#         "prediction": int(prediction),
#         "probability": round(float(probability), 4),
#         "category": category
#     })


# if __name__ == '__main__':
#     app.run(debug=True, port=5000)