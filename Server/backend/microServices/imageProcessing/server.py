from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from image_processor import process_image_and_return_colors
import requests 

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './images'

@app.route('/process-image', methods=['POST'])
def process_image_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)
        
        colors_hex, image_name = process_image_and_return_colors(image_path)
        database_service_url = 'http://90.191.79.223:25576/image' 
        payload = {"image_name": image_name, "colors": colors_hex}
        response = requests.post(database_service_url, json=payload)
        
        if response.status_code == 200:
            return jsonify({"message": "Data successfully processed and stored.", "data": payload})
        else:
            return jsonify({"error": "Failed to store data in databaseService."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=25577, debug=True)