# image_processor.py
import cv2
import numpy as np
from sklearn.cluster import KMeans

def load_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Image not found or the file format is not supported")
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

def apply_kmeans(image, k=5):
    reshaped_image = image.reshape((-1, 3))
    kmeans = KMeans(n_clusters=k, random_state=0).fit(reshaped_image)
    return kmeans.cluster_centers_

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

def process_image_and_return_colors(image_path, k=5, ranges_to_ignore=None, darkness_threshold=30):
    if ranges_to_ignore is None:
        ranges_to_ignore = [((90, 140), (10, 255), (50, 255)), ((0, 180), (0, 50), (50, 80))]

    image = load_image(image_path)
    dominant_colors = apply_kmeans(image, k)
    enhanced_colors = enhance_colors(dominant_colors)
    preferred_colors = filter_colors(enhanced_colors, ranges_to_ignore, darkness_threshold)
    preferred_colors_sorted = sorted(preferred_colors, key=lambda c: cv2.cvtColor(np.uint8([[c]]), cv2.COLOR_RGB2HSV)[0][0][2], reverse=True)
    top_3_colors_hex = [rgb_to_hex(color) for color in preferred_colors_sorted[:3]]
    
    return top_3_colors_hex, image_path.split('/')[-1]