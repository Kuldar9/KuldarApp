import cv2
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

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
        hsv_color[1] = min(hsv_color[1] * 1.25, 255)  # Increase saturation with upper limit
        hsv_color[2] = min(hsv_color[2] * 1.10, 255)  # Increase brightness with upper limit
        rgb_color = cv2.cvtColor(np.uint8([[hsv_color]]), cv2.COLOR_HSV2RGB)[0][0]
        enhanced_colors.append(rgb_color)
    return enhanced_colors

def filter_colors(colors, ranges_to_ignore, darkness_threshold):
    filtered_colors = []
    for color in colors:
        hsv_color = cv2.cvtColor(np.uint8([[color]]), cv2.COLOR_RGB2HSV)[0][0]
        if hsv_color[2] < darkness_threshold:  # If the value/brightness is less than the threshold, ignore
            continue
        ignore = any(all(r[0] <= ch <= r[1] for ch, r in zip(hsv_color, range_to_ignore)) for range_to_ignore in ranges_to_ignore)
        if not ignore:
            filtered_colors.append(color)
    return filtered_colors

def create_palette(colors):
    palette = np.zeros((100, len(colors)*100, 3), dtype=np.uint8)
    for i, color in enumerate(colors):
        palette[:, i*100:(i+1)*100] = color
    return palette

def process_image(image_path, k=5, ranges_to_ignore=None, darkness_threshold=30):
    if ranges_to_ignore is None:
        # Define ranges to ignore as HSV [(min_hue, max_hue), (min_sat, max_sat), (min_val, max_val)]
        ranges_to_ignore = [((90, 140), (10, 255), (50, 255)),  # Ignore sky blue
                            ((0, 180), (0, 50), (50, 80))]     # Ignore road gray

    image = load_image(image_path)
    dominant_colors = apply_kmeans(image, k)
    enhanced_colors = enhance_colors(dominant_colors)
    preferred_colors = filter_colors(enhanced_colors, ranges_to_ignore, darkness_threshold)

    # Sort colors based on vibrancy (saturation and brightness)
    preferred_colors = sorted(preferred_colors, key=lambda c: cv2.cvtColor(np.uint8([[c]]), cv2.COLOR_RGB2HSV)[0][0][2], reverse=True)

    # Limit to the top 3 colors for the palette
    palette_colors = preferred_colors[:3]
    
    palette = create_palette(palette_colors)
    cv2.imwrite('color_palette.png', cv2.cvtColor(palette, cv2.COLOR_RGB2BGR))

# Replace 'image.jpg' with the path to your image file
process_image('./image7.jpg', k=5)