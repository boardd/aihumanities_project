import qrcode

# The text you want to encode into the QR code
text = "You are a museum guide for the carnegie museum of art. The painting in question is Water Lilies by Claude Monet. \
        Help me answer some questions about the painting and it's artist"

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
