import React, { useRef } from 'react';

const ImageUploader = () => {
  const imageInputRef = useRef(null);

  const handleImageChange = () => {
    const file = imageInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          const maxImageWidth = screenWidth / 2;
          const maxImageHeight = screenHeight / 2;

          // Calculate the desired width and height while maintaining the aspect ratio
          let newWidth, newHeight;
          if (image.width > image.height) {
            newWidth = Math.min(maxImageWidth, image.width);
            newHeight = (newWidth * image.height) / image.width;
          } else {
            newHeight = Math.min(maxImageHeight, image.height);
            newWidth = (newHeight * image.width) / image.height;
          }

          // Create a new canvas to draw the resized image
          const canvas = document.createElement('canvas');
          canvas.width = newWidth;
          canvas.height = newHeight;

          // Draw the image on the canvas with the new dimensions
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, newWidth, newHeight);

          // Get the resized image as a data URL
          const resizedImageUrl = canvas.toDataURL();

          // Display the resized image
          const imgElement = document.createElement('img');
          imgElement.src = resizedImageUrl;
          document.getElementById('imageContainer').appendChild(imgElement);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageChange} />
      <div id="imageContainer"></div>
    </div>
  );
};

export default ImageUploader;
