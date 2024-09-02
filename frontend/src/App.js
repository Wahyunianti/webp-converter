// src/App.js
import React from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div>
      <Helmet>
        <title>WebP Converter</title>
        <meta name="description" content="jpg to webp converter" />
      </Helmet>
      
    <div className="App">
      <ImageUploader />
    </div>
    </div>
  );
}

export default App;
