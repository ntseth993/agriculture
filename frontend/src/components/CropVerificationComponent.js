import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { cropService } from '../services/api';

export const CropVerificationComponent = ({ onVerified }) => {
  const [step, setStep] = useState(1); // 1: Select crop, 2: Upload image, 3: Verify, 4: Results
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCrops, setFilteredCrops] = useState([]);

  // Load all crops on mount
  useEffect(() => {
    loadCrops();
  }, []);

  // Filter crops based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCrops(crops);
    } else {
      const filtered = crops.filter(
        (crop) =>
          crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crop.scientificName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCrops(filtered);
    }
  }, [searchQuery, crops]);

  const loadCrops = async () => {
    try {
      const data = await cropService.getAllCrops();
      setCrops(data.crops || []);
      setFilteredCrops(data.crops || []);
    } catch (error) {
      toast.error('Failed to load crops');
      console.error(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    if (!selectedCrop || !imageFile) {
      toast.error('Please select crop and upload image');
      return;
    }

    try {
      setLoading(true);
      const result = await cropService.verifyCrop(selectedCrop._id, imageFile);
      setVerification(result.verification);
      setStep(4);

      if (onVerified) {
        onVerified({
          crop: selectedCrop,
          verification: result.verification,
        });
      }

      if (result.verification.status === 'verified') {
        toast.success('Crop verified successfully!');
      } else {
        toast.error('Crop verification failed');
      }
    } catch (error) {
      toast.error(error.message || 'Verification failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedCrop(null);
    setImage(null);
    setImageFile(null);
    setVerification(null);
    setSearchQuery('');
  };

  // Step 1: Select Crop
  if (step === 1) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Step 1: Select Your Crop</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search crop by name or scientific name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto mb-6">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div
                key={crop._id}
                onClick={() => {
                  setSelectedCrop(crop);
                  setStep(2);
                }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedCrop?._id === crop._id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                <h3 className="font-bold text-lg text-gray-800">{crop.name}</h3>
                <p className="text-sm text-gray-600">{crop.scientificName}</p>
                <p className="text-xs text-gray-500 mt-2">Season: {crop.season}</p>
                {crop.soilType && (
                  <p className="text-xs text-gray-500">Soil: {crop.soilType.join(', ')}</p>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-500">No crops found</p>
          )}
        </div>

        {selectedCrop && (
          <button
            onClick={() => setStep(2)}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
          >
            Continue with {selectedCrop.name}
          </button>
        )}
      </div>
    );
  }

  // Step 2: Upload Image
  if (step === 2) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Step 2: Upload Crop Image</h2>
        <p className="text-gray-600 mb-6">Selected: <span className="font-semibold">{selectedCrop?.name}</span></p>

        {image ? (
          <div className="mb-6">
            <img src={image} alt="Preview" className="w-full rounded-lg border-2 border-green-500 mb-4" />
            <button
              onClick={() => {
                setImage(null);
                setImageFile(null);
              }}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mb-4"
            >
              Choose Different Image
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        ) : (
          <label className="block mb-6 cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="34" cy="14" r="4" strokeWidth="2" />
                <path d="M9 37l9-9m4-4l18-18" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-gray-600 font-semibold">Click to upload crop image</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}

        <button
          onClick={() => setStep(1)}
          className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    );
  }

  // Step 3: Verifying
  if (step === 3) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl text-center">
        <FiLoader className="mx-auto text-4xl text-blue-500 animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Your Crop</h2>
        <p className="text-gray-600">Please wait while we analyze your crop image...</p>
        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Start Verification'}
        </button>
      </div>
    );
  }

  // Step 4: Results
  if (step === 4 && verification) {
    const isVerified = verification.status === 'verified';

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          {isVerified ? (
            <div className="flex flex-col items-center">
              <FiCheck className="text-5xl text-green-500 mb-2" />
              <h2 className="text-2xl font-bold text-green-600">Verification Successful</h2>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FiX className="text-5xl text-red-500 mb-2" />
              <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
            </div>
          )}
        </div>

        {/* Verification Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div>
            <p className="text-sm text-gray-600">Crop Type</p>
            <p className="font-semibold text-lg">{selectedCrop?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Confidence Level</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${isVerified ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${verification.confidence * 100}%` }}
                />
              </div>
              <span className="font-semibold">{(verification.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
          {verification.message && (
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-gray-700">{verification.message}</p>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {verification.suggestions && verification.suggestions.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Details:</h3>
            <ul className="space-y-2">
              {verification.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reasons (if rejected) */}
        {verification.reasons && verification.reasons.length > 0 && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-red-700 mb-3">Reasons for Rejection:</h3>
            <ul className="space-y-2">
              {verification.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-red-700">
                  <span className="mt-1">×</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Image Preview */}
        {image && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Uploaded Image:</p>
            <img src={image} alt="Verification" className="w-full rounded-lg border-2 border-gray-300" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {isVerified && (
            <button
              onClick={() => {
                // Next step: disease detection
                onVerified({
                  crop: selectedCrop,
                  verification,
                });
              }}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
            >
              Continue to Disease Detection
            </button>
          )}
          <button
            onClick={resetForm}
            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
          >
            Verify Another Crop
          </button>
        </div>
      </div>
    );
  }

  return null;
};
