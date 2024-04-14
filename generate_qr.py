import qrcode
import os




# The text you want to encode into the QR code
text = "Bathers with Crab - Pierre-Auguste Renoir.jpg"

# Generate the QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(text)
qr.make(fit=True)

# Create an image from the QR Code instance
img = qr.make_image(fill_color="black", back_color="white")

# Save the image to a file
img.save("test_qr.png")

print("QR code generated successfully.")
