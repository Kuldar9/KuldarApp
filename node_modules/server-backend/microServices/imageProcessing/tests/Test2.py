import cv2
import numpy as np
from sklearn.cluster import KMeans
from matplotlib import pyplot as plt

def extract_significant_colors(image_path, k=8, contrast_threshold=0.4):
    # Load the image
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Simple segmentation: Convert to HSV and threshold for vibrancy
    hsv_image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    _, saturation, _ = cv2.split(hsv_image)
    _, vibrant_mask = cv2.threshold(saturation, 40, 255, cv2.THRESH_BINARY)

    # Apply the mask to focus on vibrant areas
    vibrant_pixels = image[vibrant_mask == 255]

    # Apply K-Means clustering to find dominant colors in vibrant areas
    kmeans = KMeans(n_clusters=k)
    kmeans.fit(vibrant_pixels)
    dominant_colors = kmeans.cluster_centers_.astype(int)

    # Filter colors to enhance contrast and ensure they are distinct enough
    final_colors = filter_contrasting_colors(dominant_colors, contrast_threshold)

    # Generate and save the color palette image
    save_color_palette(final_colors, 'theme.png')

def filter_contrasting_colors(colors, threshold):
    # Implement a simple algorithm to ensure colors are distinct
    # Placeholder for custom logic
    filtered_colors = colors # This should be replaced with your logic
    return filtered_colors

def save_color_palette(colors, filename):
    # Generate a palette image with the colors
    height = 100
    width_per_color = 100
    palette_image = np.zeros((height, len(colors) * width_per_color, 3), np.uint8)

    for i, color in enumerate(colors):
        palette_image[:, i * width_per_color:(i + 1) * width_per_color] = color

    plt.imshow(palette_image)
    plt.axis('off')
    plt.savefig(filename)

# Example usage
extract_significant_colors('./image.jpg', k=8)