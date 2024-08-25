// src/components/ImageUploader.js
import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/convert', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (error) {
      alert('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Convert Image to WebP</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Converting...' : 'Convert to WebP'}
      </button>
      {downloadUrl && <a href={downloadUrl} download="converted.webp">Download WebP</a>}
    </div>
  );
}

export default ImageUploader;
