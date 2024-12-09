from flask import Flask, request, jsonify
import pickle
from keras.models import load_model
import pandas as pd
import numpy as np
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the saved preprocessing pipeline and model
with open('preprocessing_pipeline.pkl', 'rb') as f:
    preprocessor = pickle.load(f)

model = load_model('neural_network_model.h5')

# List of required columns
required_columns = [
    "First Term Gpa' numeric",
    "Second Term Gpa' numeric",
    "First Language' numeric",
    " Funding numeric",
    "School numeric",
    "FastTrack numeric",
    "Coop numeric",
    " Residency numeric",
    "Gender numeric",
    "Previous Education' numeric",
    "Age Group' numeric",
    "High School Average Mark' numeric",
    "Math Score' numeric",
    "English Grade' numeric",
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        missing_columns = [col for col in required_columns if col not in input_data]
        if missing_columns:
            return jsonify({'error': f'Missing columns: {missing_columns}'})

        input_df = pd.DataFrame([input_data])
        
        processed_data = preprocessor.transform(input_df)
        

        prediction = model.predict(processed_data)
        prediction_label = int(round(prediction[0][0])) 
        
        return jsonify({
            'prediction': prediction_label,
            'probability': float(prediction[0][0])
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
