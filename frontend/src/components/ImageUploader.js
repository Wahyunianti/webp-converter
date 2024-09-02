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
      alert('Pilih gambar dulu ngab.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://webp-converter-server.vercel.app/convert', formData, {
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

    <div className="m-0 p-0 h-full box-border">
      <div className="w-full h-screen relative ">
      <img className='inset-x-0 md:left-20 left-10 bottom-0 absolute -z-10 md:z-10 h-2/5 md:h-3/4 ' src='gambar.webp' alt='gambar'></img>

        <div className='flex flex-col w-full h-auto pt-10 px-5 md:px-24 gap-8 z-3000 items-end'>
          <h1 className='text-3xl md:text-6xl text-indigo-700 drop-shadow-lg shadow-purple-950 text-center self-center'>WEBP CONVERTER</h1>
          <div className='w-full md:w-3/6 h-80 rounded-lg bg-yellow-50 border-4 border-red-200 border-dashed self-center md:self-end flex flex-col justify-center items-center gap-5 py-5 px-3'>
            <p className='text-indigo-800'>Pilih gambar yang ingin diconvert (image type)</p>
            <input type='file' accept="image/*" onChange={handleFileChange} className='border border-5 border-indigo-900 bg-white rounded-md w-full h-auto p-2'></input>
            <div className='flex md:flex-row flex-col items-center md:justify-center gap-5'>
            <button onClick={handleUpload} disabled={loading} className='w-max h-auto px-5 py-2 rounded-md bg-gradient-to-r from-yellow-100 to-pink-200 shadow-md text-indigo-800 hover:cursor-pointer '>{loading ? 'Converting...' : 'Convert to WebP'}</button>
            {downloadUrl && <a href={downloadUrl} download="converted.webp" onClick={handleUpload} disabled={loading} className='w-max h-auto px-5 py-2 rounded-md bg-gradient-to-r from-yellow-100 to-pink-200 shadow-md text-indigo-800 hover:cursor-pointer '>Download WebP</a>}

            </div>

          </div>
        </div>


      </div>

      <div className='w-full h-auto absolute inset-x-0 -bottom-20 md:bottom-0 -z-10 '>
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="53%" x2="100%" y2="47%"><stop offset="5%" stop-color="#cee5ff"></stop><stop offset="95%" stop-color="#ffc0c4"></stop></linearGradient></defs><path d="M 0,600 L 0,225 C 168.93333333333334,207.93333333333334 337.8666666666667,190.86666666666665 516,215 C 694.1333333333333,239.13333333333335 881.4666666666667,304.4666666666667 1037,313 C 1192.5333333333333,321.5333333333333 1316.2666666666667,273.26666666666665 1440,225 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
      
      </div>

      <div className='w-full h-screen absolute inset-0 -z-20 bg-gradient-to-b from-yellow-100 to-pink-200 '>
      
      </div>

    </div>
  );
}

export default ImageUploader;
