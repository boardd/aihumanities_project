import React, { useState } from 'react';

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);

      const imageUrl = URL.createObjectURL(selectedImage);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="QRCode"
      />
    </div>
  );
}
