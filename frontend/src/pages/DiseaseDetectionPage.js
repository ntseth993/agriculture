import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUploadComponent } from '../components/ImageUploadComponent';
import { CropVerificationPanel } from '../components/CropVerificationPanel';
import { ThemeToggle } from '../components/ThemeToggle';
import { diseaseService } from '../services/api';
import toast from 'react-hot-toast';

export const DiseaseDetectionPage = () => {
  const [image, setImage] = useState(null);
  const [cropId, setCropId] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState(null);
  const navigate = useNavigate();

  const supportedLanguages = {
    en: 'English',
    hi: 'Hindi',
    es: 'Spanish',
    fr: 'French',
    pt: 'Portuguese',
    zh: 'Chinese (Simplified)',
    ja: 'Japanese',
    ar: 'Arabic',
  };

  const handleImageCapture = async (imageData) => {
    setImage(imageData);
    await analyzeImage(imageData);
  };

  const analyzeImage = async (imageData) => {
    if (!cropId) {
      toast.error('Please select a crop first');
      return;
    }

    try {
      setLoading(true);
      setDetection(null);

      // Get user location
      let latitude = 0;
      let longitude = 0;

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch (e) {
        console.log('Location not available, using default coordinates');
      }

      // Call disease detection API with language
      const result = await diseaseService.detectDisease(
        imageData,
        cropId,
        latitude,
        longitude,
        language
      );

      setDetection(result.detection);
      toast.success('Disease analysis complete! 🎯');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setDetection(null);
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Header with Back Button and Theme Toggle */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back
          </button>
          <ThemeToggle />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">AI-Powered Crop Disease Detection</h1>
          <p className="text-gray-600 dark:text-gray-300">Upload an image to instantly analyze crop health and get treatment recommendations</p>
        </div>

        {/* Language Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Crop
              </label>
              <select
                value={cropId}
                onChange={(e) => setCropId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Choose a crop...</option>
                <option value="wheat">🌾 Wheat</option>
                <option value="rice">🍚 Rice</option>
                <option value="corn">🌽 Corn</option>
                <option value="tomato">🍅 Tomato</option>
                <option value="potato">🥔 Potato</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Response Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {Object.entries(supportedLanguages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Image Upload Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <ImageUploadComponent onImageCapture={handleImageCapture} />

          {image && typeof image === 'string' && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Captured Image Preview</h3>
              <img src={image} alt="Captured" className="w-full max-h-96 object-contain rounded-lg" />
            </div>
          )}
        </div>

        {/* Disease Detection Results */}
        {(loading || detection) && (
          <CropVerificationPanel
            detection={detection}
            loading={loading}
            onRetry={handleRetry}
            language={language}
          />
        )}

        {/* Info Cards */}
        {!detection && !loading && (
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">📷</div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Capture or Upload</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Take a photo or upload an image of your crop</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-800 dark:text-white">AI Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Advanced ML detects diseases instantly</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">💊</div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Get Solutions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Receive treatment recommendations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
