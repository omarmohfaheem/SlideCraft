import requests
from PIL import Image, UnidentifiedImageError
from io import BytesIO
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def search_google_images(query):
    # Set up the search parameters
    api_key = 'AIzaSyC41IiXPH6j0ATwghuQL40XUrn4h3ETfAs'
    cse_id = '16cfbe527949b4c13'

    # Build the service
    service = build("customsearch", "v1", developerKey=api_key)

    # Define the search parameters
    search_params = {
        'q': query,
        'cx': cse_id,
        'searchType': 'image',
        'num': 10,  
        'fileType': 'jpg,png',
    }

    try:
        result = service.cse().list(**search_params).execute()

        # Get the image URLs
        image_urls = []
        if 'items' in result:
            for item in result['items']:
                image_urls.append(item['link'])
        return image_urls
    except HttpError as e:
        print(f"HTTP Error occurred: {e}")
        return []

def download_image(image_url):
    try:
        if not image_url.startswith(('http://', 'https://')):
            print(f"Invalid URL: {image_url}")
            return None

        response = requests.get(image_url)
        response.raise_for_status()

        # Verify that the content type is an image and not a GIF
        content_type = response.headers.get('Content-Type', '')
        if 'image' not in content_type or 'gif' in content_type:
            print(f"Error: URL does not point to a valid image (no GIFs allowed): {image_url}")
            return None

        image = Image.open(BytesIO(response.content))

       # Check if the image is smaller than or equal to 1024x768
        if image.size[0] > 1024 or image.size[1] > 768:
            print(f"Error: Image is larger than 1024x768: {image.size}")
            return None

        return image
    except requests.RequestException as e:
        print(f"Error downloading image: {e}")
        return None
    except UnidentifiedImageError as e:
        print(f"Error identifying image: {e}")
        return None

def save_image(image, file_path):
    if image is None:
        print("No image to save.")
        return None

    # Determine the correct image format
    ext = image.format.lower()
    print(f"Image format: {ext}")

    # Ensure the image is in RGB mode for saving as JPEG if needed
    if image.mode != 'RGB' and ext == 'jpeg':
        image = image.convert('RGB')
    
    # Save the image with the appropriate extension
    if ext not in ['jpeg', 'png']:
        ext = 'jpeg'  # Default to JPEG if format is not supported
        file_path = file_path.rsplit('.', 1)[0] + '.jpeg'
    else:
        file_path = file_path.rsplit('.', 1)[0] + '.' + ext

    image.save(file_path)
    return file_path