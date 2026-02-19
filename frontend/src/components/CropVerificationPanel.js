import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiFileText } from 'react-icons/fi';
import './CropVerificationPanel.css';

export const CropVerificationPanel = ({ detection, loading, onRetry, language = 'en' }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (detection) {
      setAnimateIn(true);
    }
  }, [detection]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex items-center justify-center gap-4 animate-pulse">
          <div className="w-12 h-12 text-blue-500 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Analyzing your crop...</h3>
            <p className="text-gray-500 mt-2">Using AI to detect diseases and provide recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  if (!detection) {
    return null;
  }

  const confidenceGrade = detection.confidencePercentage > 80 ? 'High' : 
                         detection.confidencePercentage > 60 ? 'Medium' : 'Low';

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-500 ${
        animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {detection.confidence > 0.5 && detection.diseaseId !== 'healthy' ? (
          <>
            <FiAlertCircle className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">Attention Required</h2>
          </>
        ) : (
          <>
            <FiCheckCircle className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">Crop Status Report</h2>
          </>
        )}
      </div>

      {/* Disease Detection Result */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-gray-600 mb-1">Detected Condition</p>
        <p className="text-3xl font-bold text-gray-800">{detection.diseaseName}</p>
        <p className="text-sm text-gray-700 mt-2">{detection.description}</p>
        
        {/* Confidence Score */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Detection Confidence</span>
            <span className="text-sm font-semibold text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
              {detection.confidencePercentage}% ({confidenceGrade})
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              style={{ width: `${detection.confidencePercentage}%` }}
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Detected Symptoms */}
      {detection.detectedSymptoms && detection.detectedSymptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Symptoms Detected</h3>
          <div className="space-y-2">
            {detection.detectedSymptoms.map((symptom, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <FiAlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 font-medium capitalize">{symptom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plant Symptoms List */}
      {detection.symptoms && detection.symptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Plant Signs</h3>
          <div className="space-y-2">
            {detection.symptoms.map((symptom, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-sm text-gray-700">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Treatments */}
      {detection.treatments && detection.treatments.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Recommended Treatments</h3>
          <div className="space-y-2">
            {detection.treatments.map((treatment, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-700">{treatment}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {detection.recommendations && detection.recommendations.length > 0 && (
        <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            Action Plan
          </h3>
          <div className="space-y-2">
            {detection.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-blue-500 font-bold">{idx + 1}.</span>
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Language Badge */}
      {language && language !== 'en' && (
        <div className="mb-4 p-2 bg-purple-50 rounded border border-purple-200">
          <p className="text-xs text-purple-700">Translation Language: {language.toUpperCase()}</p>
        </div>
      )}

      {/* Timestamp */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Generated: {new Date().toLocaleString()}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onRetry}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
        >
          Analyze Another Image
        </button>
        <button
          onClick={() => toast.success('Report saved!')}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
        >
          Save Report
        </button>
      </div>
    </div>
  );
};
