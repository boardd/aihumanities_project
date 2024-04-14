import os
import qrcode
from tqdm import tqdm

def list_files_in_directory(directory_path):
    # Ensure the directory exists
    if not os.path.exists(directory_path):
        raise FileNotFoundError(f"The directory {directory_path} does not exist.")
    
    # Ensure the specified path is a directory
    if not os.path.isdir(directory_path):
        raise NotADirectoryError(f"The path {directory_path} is not a directory.")
    
    # List files in the directory
    file_names = os.listdir(directory_path)
    
    return file_names

painting_names = list_files_in_directory("images/")

for name in tqdm(painting_names):

    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(name)
    qr.make(fit=True)

    # Create an image from the QR Code instance
    img = qr.make_image(fill_color="black", back_color="white")
    
    path = "qr_codes/" + name
    # Save the image to a file
    img.save(path)


