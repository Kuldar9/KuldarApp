import os
import logging
import cv2
import numpy as np
from sklearn.cluster import KMeans
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import requests
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './images'

# Configure logging
logging.basicConfig(level=logging.INFO)

def log(category, content):
    print(f'{category}: {content}')
    # Log to file
    logging.info(f'{category}: {content}')
    # Send log to logging service
    send_log_to_logging_service(category, content)

def send_log_to_logging_service(category, content):
    try:
        logging_service_url = 'http://90.191.79.223:25580/log'  # Update with logging gateway URL
        log_message = {'category': category, 'content': content}
        response = requests.post(logging_service_url, json=log_message)
        if response.status_code != 200:
            print('Failed to send log to logging service:', response.text)
    except Exception as e:
        print('Error sending log to logging service:', e)

def load_image(image_path):
    try:
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Image not found or the file format is not supported")
        return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    except Exception as e:
        log('App', f'Error loading image {image_path}: {e}')
        raise

def apply_kmeans(image, k=5):
    try:
        reshaped_image = image.reshape((-1, 3))
        kmeans = KMeans(n_clusters=k, random_state=0).fit(reshaped_image)
        return kmeans.cluster_centers_
    except Exception as e:
        log('App', f'Error applying KMeans: {e}')
        raise

def enhance_colors(colors):
    enhanced_colors = []
    for color in colors:
        hsv_color = cv2.cvtColor(np.uint8([[color]]), cv2.COLOR_RGB2HSV)[0][0]
        hsv_color[1] = min(hsv_color[1] * 1.25, 255)
        hsv_color[2] = min(hsv_color[2] * 1.10, 255)
        rgb_color = cv2.cvtColor(np.uint8([[hsv_color]]), cv2.COLOR_HSV2RGB)[0][0]
        enhanced_colors.append(rgb_color)
    return enhanced_colors

def filter_colors(colors, ranges_to_ignore, darkness_threshold):
    filtered_colors = []
    for color in colors:
        hsv_color = cv2.cvtColor(np.uint8([[color]]), cv2.COLOR_RGB2HSV)[0][0]
        if hsv_color[2] < darkness_threshold:
            continue
        ignore = any(all(r[0] <= ch <= r[1] for ch, r in zip(hsv_color, range_to_ignore)) for range_to_ignore in ranges_to_ignore)
        if not ignore:
            filtered_colors.append(color)
    return filtered_colors

def rgb_to_hex(rgb):
    return '#{0:02x}{1:02x}{2:02x}'.format(int(rgb[0]), int(rgb[1]), int(rgb[2]))

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/process-image', methods=['POST'])
def handle_image_processing():
    if 'imageFile' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['imageFile']
    if file.filename == '':
        return jsonify({'error': 'No image file selected'}), 400
    
    try:
        # Save the image temporarily
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)
        
        log('Processing', f'Processing image: {filename}')
        
        # Process the image
        color_codes = process_image(image_path, k=3)  # Adjust parameters as necessary

        # Print out user_info, image_data, and color codes received
        user_info = json.loads(request.form.get('userInfo'))  # Parse JSON string to dictionary
        print('User info received:', user_info)
        print('Color codes received:', color_codes)
        
        # Delete the temporary image file
        os.remove(image_path)
        
        log('ImageProcess', f'Successfully processed image: {filename}')
        
        # Include image name in the response
        response_data = {"message": "Image processed successfully", "colorCodes": color_codes, "imageName": filename}
        
        # Print out response_data before sending it
        print('Response data:', response_data)
        
        # Send user info and image data to database
        send_to_database(json.dumps(user_info), response_data)
        
        return jsonify(response_data), 200

    except Exception as e:
        log('App', f'Error processing image: {e}')
        return jsonify({"error": "Failed to process image"}), 500

def process_image(image_path, k=5, ranges_to_ignore=None, darkness_threshold=30):
    try:
        # Default ranges to ignore specific color ranges (e.g., too dark/light)
        if ranges_to_ignore is None:
            ranges_to_ignore = [((90, 140), (10, 255), (50, 255)), ((0, 180), (0, 50), (50, 80))]
        
        image = load_image(image_path)
        dominant_colors = apply_kmeans(image, k)
        enhanced_colors = enhance_colors(dominant_colors)
        preferred_colors = filter_colors(enhanced_colors, ranges_to_ignore, darkness_threshold)
        
        # Sort colors by their HSV Value to prioritize brighter colors
        preferred_colors_sorted = sorted(preferred_colors, key=lambda c: cv2.cvtColor(np.uint8([[c]]), cv2.COLOR_RGB2HSV)[0][0][2], reverse=True)
        
        # Extract the top 3 color codes in HEX format
        top_3_colors_hex = [rgb_to_hex(color) for color in preferred_colors_sorted[:3]]
        
        log('App', f'Processed image {image_path} and extracted top 3 color codes.')
        return top_3_colors_hex
    except Exception as e:
        log('App', f'Error processing image {image_path}: {e}')
        raise

def send_to_database(user_info, image_data):
    try:
        # Print out user_info, image_data, and color codes before sending to the database service
        print('User info:', user_info)
        print('Image data:', image_data)
        
        # Send user info and image data to the database service
        database_url = 'http://90.191.79.223:25576/api/save-image'  # Update with database service URL
        payload = {'userInfo': user_info, 'imageData': image_data}
        response = requests.post(database_url, json=payload)
        if response.status_code != 200:
            log('App', f'Failed to send data to database: {response.text}')
    except Exception as e:
        log('App', f'Error sending data to database: {e}')

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(host='0.0.0.0', port=25577, debug=True)