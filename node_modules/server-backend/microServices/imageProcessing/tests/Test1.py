import cv2
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

def resize_image(image, max_size=800):
    """Resize the image to speed up processing while maintaining aspect ratio."""
    h, w = image.shape[:2]
    scale = max_size / max(h, w)
    
    if scale < 1:
        image = cv2.resize(image, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    return image

def extract_dominant_colors(image, k=8, skin_tone_threshold=0.1):
    """Extracts dominant colors, applying logic to refine based on scene context."""
    resized_image = resize_image(image)
    pixels = resized_image.reshape((-1, 3))
    
    # Use KMeans to find dominant colors
    kmeans = KMeans(n_clusters=k)
    labels = kmeans.fit_predict(pixels)
    unique_labels, counts = np.unique(labels, return_counts=True)
    
    # Calculate the percentage of each color
    percentages = counts / sum(counts)
    dominant_colors = kmeans.cluster_centers_.astype('uint8')
    
    # Filter based on custom logic (e.g., ignoring skin tones unless pretty much dominant)
    filtered_colors = []
    for color, percentage in zip(dominant_colors, percentages):
        if is_skin_tone(color) and percentage < skin_tone_threshold:
            continue  # Skip skin tones if they don't dominate the image
        filtered_colors.append(color)
    
    return filtered_colors

def is_skin_tone(color):
    """Basic check to identify if a color could be considered a skin tone."""
    hsv_color = cv2.cvtColor(np.uint8([[color]]), cv2.COLOR_RGB2HSV)[0][0]
    return 5 <= hsv_color[0] <= 20 and 50 <= hsv_color[1] <= 150

def save_color_palette(colors, filename='palette.png'):
    """Save the color palette to an image file."""
    palette_height = 50
    palette_width = 50 * len(colors)
    palette = np.zeros((palette_height, palette_width, 3), dtype='uint8')
    
    for i, color in enumerate(colors):
        palette[:, i * 50:(i + 1) * 50, :] = color
    
    # Save the palette as an image file
    cv2.imwrite(filename, cv2.cvtColor(palette, cv2.COLOR_RGB2BGR))

# Load image
image_path = './image.jpg'
image = cv2.imread(image_path)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Extract and save the palette
colors = extract_dominant_colors(image, k=8)
save_color_palette(colors, 'palette.png')