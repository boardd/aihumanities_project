import os
import cv2

def list_files_in_directory(directory_path):
    # Ensure the directory exists
    if not os.path.exists(directory_path):
        raise FileNotFoundError(f"The directory {directory_path} does not exist.")
    
    # Ensure the specified path is a directory
    if not os.path.isdir(directory_path):
        raise NotADirectoryError(f"The path {directory_path} is not a directory.")
    
    # List files in the directory
    file_names = os.listdir(directory_path)
    
    return file_names\

def clear_files_in_directory(directory_path):
    """
    Deletes all files in the specified directory, leaving subdirectories intact.
    
    Args:
    directory_path (str): The path to the directory from which to delete files.
    """
    # List all entries in the directory
    for entry in os.listdir(directory_path):
        file_path = os.path.join(directory_path, entry)
        # Check if it is a file and delete it
        if os.path.isfile(file_path):
            os.remove(file_path)
        # Optionally add here else condition to handle subdirectories

output_dir = "selected_imgs/"
source_dir = "test_codes2/"

clear_files_in_directory(output_dir)

files = list_files_in_directory(source_dir)

for filename in files:
  # read the QRCODE image
  image = cv2.imread(source_dir + filename)

  grey_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

  # initialize the cv2 QRCode detector
  detector = cv2.QRCodeDetector()

  # detect and decode
  data, vertices_array, binary_qrcode = detector.detectAndDecode(grey_img)

  # if there is a QR code
  # print the data
  if vertices_array is not None:
    print("QRCode data:", data)
    loaded_img = cv2.imread("images/"+data)
    cv2.imwrite(output_dir+data, loaded_img)
  else:
    print("File Name:", filename)
    print("There was some error")
    print(data)

