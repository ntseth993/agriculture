import React, { useState } from 'react';
import { CropVerificationComponent } from '../components/CropVerificationComponent';
import { ImageUploadComponent } from '../components/ImageUploadComponent';
import { diseaseService, treatmentService } from '../services/api';
import toast from 'react-hot-toast';

export const CropVerificationPage = () => {
  const [verificationStep, setVerificationStep] = useState('verify'); // 'verify' or 'detect'
  const [verifiedCrop, setVerifiedCrop] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState(null);
  const [treatments, setTreatments] = useState([]);

  const handleVerified = async (data) => {
    setVerifiedCrop(data.crop);
    setVerificationData(data.verification);
    setVerificationStep('detect');
  };

  const handleImageCapture = async (imageData) => {
    if (!verifiedCrop) {
      toast.error('Please verify crop first');
      return;
    }

    setImage(imageData);
    await analyzeImage(imageData);
  };

  const analyzeImage = async (imageData) => {
    try {
      setLoading(true);

      // Get user location
      const userLocation = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            resolve({ latitude: 0, longitude: 0 });
          }
        );
      });

      const result = await diseaseService.detectDisease(
        imageData,
        verifiedCrop._id,
        userLocation.latitude,
        userLocation.longitude
      );

      setDetection(result.detection);

      if (result.detection.detectedDisease) {
        const treatmentsData = await treatmentService.getTreatmentsForDisease(
          result.detection.detectedDisease
        );
        setTreatments(treatmentsData.treatments || []);
      }

      toast.success('Disease analysis complete!');
    } catch (error) {
      toast.error(error.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const resetProcess = () => {
    setVerificationStep('verify');
    setVerifiedCrop(null);
    setVerificationData(null);
    setImage(null);
    setDetection(null);
    setTreatments([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Crop Health Advisory</h1>
        <p className="text-gray-600 mb-8">Verify your crop and detect diseases in two easy steps</p>

        {/* Progress Indicators */}
        <div className="flex gap-4 mb-8">
          <div className={`flex-1 p-4 rounded-lg text-center font-semibold ${
            verificationStep === 'verify' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-300 text-gray-800'
          }`}>
            Step 1: Verify Crop
          </div>
          <div className={`flex-1 p-4 rounded-lg text-center font-semibold ${
            verificationStep === 'detect' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-300 text-gray-800'
          }`}>
            Step 2: Detect Disease
          </div>
        </div>

        {/* Main Content */}
        {verificationStep === 'verify' ? (
          <CropVerificationComponent onVerified={handleVerified} />
        ) : (
          <div className="space-y-6">
            {/* Verification Summary */}
            {verifiedCrop && verificationData && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">✓ Crop Verified</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Crop Type</p>
                    <p className="text-lg font-semibold">{verifiedCrop.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Verification Confidence</p>
                    <p className="text-lg font-semibold">
                      {(verificationData.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Scientific Name</p>
                    <p className="text-gray-800">{verifiedCrop.scientificName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setVerificationStep('verify')}
                  className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
                >
                  ← Verify Different Crop
                </button>
              </div>
            )}

            {/* Disease Detection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: Detect Disease</h2>

              <ImageUploadComponent onImageCapture={handleImageCapture} />

              {image && typeof image === 'string' && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Image Preview</h3>
                  <img src={image} alt="For analysis" className="w-full max-h-96 rounded-lg border-2 border-gray-300" />
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-8 text-center">
                <div className="inline-block animate-spin">
                  <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
                <p className="mt-4 text-lg font-semibold text-blue-700">
                  Analyzing crop for diseases...
                </p>
              </div>
            )}

            {/* Detection Results */}
            {detection && (
              <div className="space-y-6">
                {/* Disease Analysis */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">Analysis Results</h3>

                  {detection.detectedDisease ? (
                    <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4 mb-4">
                      <p className="text-lg font-bold text-yellow-800">
                        ⚠️ Disease Detected: {detection.detectedDisease.name}
                      </p>
                      <p className="text-gray-700 mt-2">
                        Confidence: <span className="font-semibold">{(detection.confidence * 100).toFixed(1)}%</span>
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
                      <p className="text-lg font-bold text-green-700">
                        ✓ No Disease Detected
                      </p>
                      <p className="text-gray-700 mt-2">Your crop appears to be healthy!</p>
                    </div>
                  )}
                </div>

                {/* Recommended Treatments */}
                {treatments.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Recommended Treatments</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {treatments.map((treatment) => (
                        <div key={treatment._id} className="border-2 border-gray-300 rounded-lg p-4 hover:border-green-500 transition">
                          <h4 className="font-bold text-lg mb-2">{treatment.name}</h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-600">Type:</span>
                              <span className="font-semibold ml-2">
                                {treatment.type === 'organic' ? '🌱 Organic' : '🧪 Chemical'}
                              </span>
                            </p>
                            <p>
                              <span className="text-gray-600">Dosage:</span>
                              <span className="font-semibold ml-2">{treatment.dosage.amount} {treatment.dosage.unit}</span>
                            </p>
                            <p>
                              <span className="text-gray-600">Application:</span>
                              <span className="font-semibold ml-2">{treatment.applicationMethod}</span>
                            </p>
                            <p>
                              <span className="text-gray-600">Efficacy:</span>
                              <span className="font-semibold ml-2 text-green-600">{treatment.efficacy}%</span>
                            </p>
                            {treatment.cost && (
                              <p>
                                <span className="text-gray-600">Cost:</span>
                                <span className="font-semibold ml-2">₹{treatment.cost}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={resetProcess}
                    className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                  >
                    Analyze Another Crop
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600"
                  >
                    Print Report
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
